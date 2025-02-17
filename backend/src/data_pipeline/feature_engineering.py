# imports
import pandas as pd
from sklearn.preprocessing import OneHotEncoder

class FeatureEngineer:
    def __init__(self):
        self.numeric_features = ['tenure', 'MonthlyCharges', 'TotalCharges']
        self.category_features = [
            'InternetService', 'Contract', 'PaymentMethod'
        ]
        
    
    def create_features(self, df: pd.DataFrame) -> pd.DataFrame:
        # drop customer id column as it doesn't provide and valuable information
        df = df.drop(columns=['customerID', 'SeniorCitizen', 'Partner', 'Dependents', 'gender']) 
        
        # remove spaces between words in InternetService column
        df['InternetService'] = df['InternetService'].str.split().agg("".join)
        
        # one hot encoder
        # encode with OneHotEncoder from sklearn
        encoder = OneHotEncoder(sparse_output=False)
        one_hot_encoded = encoder.fit_transform(df[self.category_features])
        one_hot_df = pd.DataFrame(one_hot_encoded, columns=encoder.get_feature_names_out(self.category_features))
         # add columns to previous df
        df_new = pd.concat([df, one_hot_df], axis=1)

        # drop the old categorical columns
        df_new = df_new.drop(self.category_features, axis=1)
        
        # define our bins
        bins = [0, 30, 70, 100, 120]

        """
            mapping our labels to numeric values
            1 - Basic
            2 - Mid-Tier
            3 - Premium
            4 - High-End
        """
        bin_labels = ['basic', 'mid_tier', 'premium', 'high_end']
        df_new['PackageTier'] = pd.cut(df_new['MonthlyCharges'], bins=bins, labels=bin_labels)
        
        # getting customer type based on tenure
        max_tenure = df_new['tenure'].max().astype('int64')
        month_bin = [0, 12, 36, max_tenure]
        """
            logic behind bins for months:

            0-12 - NewCustomer
            13-36 - 1_to_3yr_Customer
            37+ - 3_plus_Customer

        """
        month_bin_label = ['new_customer','1_to_3yr_customer','3_plus_customer']
        df_new['TenureCategory'] = pd.cut(df_new['tenure'], bins=month_bin, labels=month_bin_label, include_lowest=True)
        
        # one hot encode the new columns created
        category_cols = df_new.select_dtypes(include=['category']).columns.tolist()
        new_one_hot_encoded = encoder.fit_transform(df_new[category_cols])
        new_one_hot_df = pd.DataFrame(new_one_hot_encoded, columns=encoder.get_feature_names_out(category_cols))

        # add columns to previous df
        df_new = pd.concat([df_new, new_one_hot_df], axis=1)

        # drop the old categorical columns
        df_new = df_new.drop(category_cols, axis=1)
        
        #print(df_new)
        # creating a new feature the identify how many services a customer has
        # list of the services 
        services = df_new[['PaperlessBilling', 'StreamingMovies', 'StreamingTV', 'TechSupport', 'DeviceProtection', 'OnlineBackup', 'OnlineSecurity', 'MultipleLines', 'PhoneService', 'InternetService_DSL', 'InternetService_Fiberoptic']]

        print(services.columns)
        
        # store the counts of each of services in a new column
        df_new['count_of_services'] = df_new[services.columns].apply(lambda row: row.value_counts().get(1,0), axis=1)


        return df_new