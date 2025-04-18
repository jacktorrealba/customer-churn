import pandas as pd

class DataCleaner:
    def __init__(self):
        # define numeric columns
        self.numeric_columns = ['Tenure', 'MonthlyCharges', 'TotalCharges']
    
    def clean(self, data: pd.DataFrame) -> pd.DataFrame:
        # copy data
        df = data.copy()
        
        # tenure feature is lowercase, let's capitalize it
        df = df.rename(columns={'tenure': 'Tenure'})
        
        # map boolean to 1 and 0
        df["Churn"] = df["Churn"].map({"Yes": 1, "No": 0})
        df["PaperlessBilling"] = df["PaperlessBilling"].map({"Yes": 1, "No": 0})
        df["StreamingMovies"] = df["StreamingMovies"].map({"No internet service": 0, "Yes": 1, "No": 0})
        df["StreamingTV"] = df["StreamingTV"].map({"No internet service": 0, "Yes": 1, "No": 0})
        df["TechSupport"] = df["TechSupport"].map({"No internet service": 0, "Yes": 1, "No": 0})
        df["DeviceProtection"] = df["DeviceProtection"].map({"No internet service": 0, "Yes": 1, "No": 0})
        df["OnlineBackup"] = df["OnlineBackup"].map({"No internet service": 0, "Yes": 1, "No": 0})
        df["OnlineSecurity"] = df["OnlineSecurity"].map({"No internet service": 0,"Yes": 1, "No": 0})
        df["PhoneService"] = df["PhoneService"].map({"Yes": 1, "No": 0})
        df["Dependents"] = df["Dependents"].map({"Yes": 1, "No": 0})
        df["Partner"] = df["Partner"].map({"Yes": 1, "No": 0})
        df["MultipleLines"] = df["MultipleLines"].map({"No phone service": 0, "Yes": 1, "No": 0})
        
        # convert monetary columns to numbers
        df['TotalCharges'] = pd.to_numeric(arg=df["TotalCharges"], errors='coerce')
        df['MonthlyCharges'] = pd.to_numeric(arg=df["MonthlyCharges"], errors='coerce')
        
        # create function to check for outliers through statistical methods like checking IQR 
        def handle_outliers(df, columns):
            for column in columns:
                if df[column].dtype in ['int64', 'float64']:
                    # calculating IQR
                    Q1 = df[column].quantile(0.25)
                    Q3 = df[column].quantile(0.75)
                    IQR = Q3 - Q1
                    lower_bound = Q1 - 1.5 * IQR
                    upper_bound = Q3 + 1.5 * IQR
                            
                    # count outliers
                    outliers = df[(df[column] < lower_bound) | (df[column] > upper_bound)][column]
                    
                    if len(outliers) > 0:
                        df.loc[df[column] < lower_bound, column] = lower_bound
                        df.loc[df[column] > upper_bound, column] = upper_bound
            return df
        
        numeric_cols = df[['MonthlyCharges', 'TotalCharges', 'Tenure']]
        df  = handle_outliers(df,numeric_cols)
        
        # fill columns that were converted earlier with the mean of the column
        df['TotalCharges'] = df['TotalCharges'].fillna(df['TotalCharges'].mean())
        df['MonthlyCharges'] = df['MonthlyCharges'].fillna(df['MonthlyCharges'].mean())
        
        return df
    
    