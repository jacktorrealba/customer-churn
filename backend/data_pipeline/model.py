# imports
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from imblearn.over_sampling import SMOTE
import pickle

class ModelTrainer:
    def __init__(self):
        self.model = LogisticRegression(
            random_state=23
        )
        self.feature_engineer = None
        self.scaler = StandardScaler()
    
    def train(self, X: pd.DataFrame, y: pd.Series):
        
        # resampling 
        X_resampled, y_resampled = SMOTE().fit_resample(X, y)
        # split the data
        X_train, X_test, y_train, y_test = train_test_split(X_resampled,y_resampled, test_size=0.2, random_state=23)

        scaler = StandardScaler()
        
        # select columns to transform
        train_cols_to_scale = X_train.select_dtypes(include=['float64']).columns
        # transform
        train_scaled_cols = scaler.fit_transform(X_train[train_cols_to_scale])
        # rewrite previous values to the scaled values
        X_train[train_cols_to_scale] = train_scaled_cols.astype(float)

        # do the same for the testing set
        test_cols_to_scale = X_test.select_dtypes(include=['float64']).columns
        test_scaled_cols = scaler.fit_transform(X_test[test_cols_to_scale])
        X_test[test_cols_to_scale] = test_scaled_cols.astype(float)
        
        self.model.fit(X_train, y_train)
        
        return self.model

    def save_model(self, filepath: str):
        with open(filepath, 'wb') as f:
            pickle.dump(self.model, f)
            
    
    def save_scaler(self, filepath: str):
        with open(filepath, 'wb') as f:
            pickle.dump(self.scaler, f)
    
        