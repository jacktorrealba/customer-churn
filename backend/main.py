import pandas as pd
import pickle
from data_pipeline import DataCleaner, FeatureEngineer,  ModelTrainer

def main():
    df = pd.read_csv('data/raw/customer_churn.csv')
    
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
    
    # print(f"Features shape: {X.shape}")
    # print(f"Feature names: {X.columns.tolist()}")
    # print(f"Target distribution: {y.value_counts()}")
    
    # train the model
    model = model_trainer.train(X, y)
    
    # store the evaluation - used to check model performance
    evaluation = model_trainer.evaluate()    
    
    # store the model and the features 
    model_data = {
        'model' : model,
        'feature_names': X.columns.tolist()
    }
    
    # save the model and the scaler as a pickle file
    with open('model/churn_model.pkl', 'wb') as f:
        pickle.dump(model_data, f)
    
    with open('model/scaler.pkl', 'wb') as f:
        pickle.dump(model_trainer.scaler, f)
    
    print("Model and scalar successfully saved")
    
if __name__ == "__main__":
    main()
    