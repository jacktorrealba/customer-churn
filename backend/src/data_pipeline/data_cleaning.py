import pandas as pd

class DataCleaner:
    def __init__(self):
        # define numeric columns
        self.numeric_columns = ['tenure', 'MonthlyCharges', 'TotalCharges']
    
    def clean(self, data: pd.DataFrame) -> pd.DataFrame:
        # copy data
        df = data.copy()
        
        df['TotalCharges'] = pd.to_numeric(arg=df["TotalCharges"], errors='coerce')
        df['MontlyCharges'] = pd.to_numeric(arg=df["TotalCharges"], errors='coerce')
        df['TotalCharges'] = df['TotalCharges'].fillna(df['TotalCharges'].mean())
        
        def handle_outliers(df, columns):
            for column in columns:
                if df[column].dtype in ['int64', 'float64']:
                    # calculating IQR
                    Q1 = df[column].quantile(0.25)
                    Q3 = df[column].quantile(0.75)
                    IQR = Q3 - Q1
                    lower_bound = Q1 - 1.5 * IQR
                    upper_bound = Q3 + 1.5 * IQR
                    #print(f"{column} Q1 is {Q1}. Lowerbound is {lower_bound}")
                    #print(f"{column} Q3 is {Q3}. Upperbound is {upper_bound}")
                    #print("\n")
                            
                    # count outliers
                    outliers = df[(df[column] < lower_bound) | (df[column] > upper_bound)][column]
                    
                    if len(outliers) > 0:
                        #print(f"\nHandling outliers in {column}")
                        #print(f"- Number of outliers: {len(outliers)}")
                        #print("\n")
                        df.loc[df[column] < lower_bound, column] = lower_bound
                        df.loc[df[column] > upper_bound, column] = upper_bound
                        #print(f"- Capped values between {lower_bound:.2f} and {upper_bound:.2f}") 
            return df
        
        numeric_cols = df[['MonthlyCharges', 'TotalCharges', 'tenure']]
        df  = handle_outliers(df,numeric_cols)
        return df
    
    