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
    
    def train(self, X: pd.DataFrame, y: pd.Series):
        
        # resampling 
        X_resampled, y_resampled = SMOTE().fit_resample(X, y)
        # split the data
        X_train, X_test, y_train, y_test = train_test_split(X_resampled,y_resampled, test_size=0.2, random_state=23)

        scalar = StandardScaler()

        X_train = scalar.fit_transform(X_train)
        X_test = scalar.fit_transform(X_test)
        
        self.model.fit(X_train, y_train)
        
        return self.model

    def save_model(self, filepath: str):
        with open(filepath, 'wb') as f:
            pickle.dump({
                'model':self.model,
                'feature_engineer': self.feature_engineer
            }, f)
    
    
        