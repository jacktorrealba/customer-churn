import pandas as pd
from data_pipeline import DataCleaner, FeatureEngineer,  ModelTrainer

def main():
    df = pd.read_csv('backend/data/raw/customer_churn.csv')
    
    # initalize cleaner
    cleaner = DataCleaner()
    feature_engineer = FeatureEngineer()
    model_trainer = ModelTrainer()
    
    # clean data
    cleaned_data = cleaner.clean(df)
    
    
    # perform feature engineering on the cleaned data
    processed_data = feature_engineer.create_features(cleaned_data)
    
    # isolate dependent and independent variables
    y = processed_data['Churn']
    X = processed_data.drop('Churn', axis=1)
    
    # train the model
    model_trainer.train(X, y)
    
    # save the model as a pickle file
    model_trainer.save_model('/backend/models/churn_model.pkl')
    
if __name__ == "__main__":
    main()
    
    