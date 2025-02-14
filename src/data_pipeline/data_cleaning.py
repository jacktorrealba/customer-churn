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
        
        
        return cleaned_data
    
    