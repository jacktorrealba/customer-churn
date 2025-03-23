# imports
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
#from imblearn.over_sampling import SMOTE
from imblearn.combine import SMOTEENN
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix

class ModelTrainer:
    def __init__(self):
        self.model = LogisticRegression(
            C=10,
            random_state=23
        )
        self.feature_engineer = None
        self.scaler = StandardScaler()
    
    def train(self, X: pd.DataFrame, y: pd.Series):
        
        # resampling 
        #X_resampled, y_resampled = SMOTE().fit_resample(X, y)
        X_resampled, y_resampled = SMOTEENN().fit_resample(X, y)
        
        # split the data
        X_train, X_test, y_train, y_test = train_test_split(X_resampled,y_resampled, test_size=0.2, random_state=23)

        # save the column names
        self.feature_names = X_train.columns.tolist()
        
        # select columns to transform
        cols_to_scale = X_train.select_dtypes(include=['float64']).columns
        
        # transform
        self.scaler.fit_transform(X_train[cols_to_scale])
        
        # transform both training and test data
        X_train[cols_to_scale] = self.scaler.fit_transform(X_train[cols_to_scale]).astype(float)
        X_test[cols_to_scale] = self.scaler.transform(X_test[cols_to_scale]).astype(float)
        
        
        self.model.fit(X_train, y_train)
        
        self.X_test = X_test
        self.y_test = y_test

        return self.model
    
    def evaluate(self):
        y_pred = self.model.predict(self.X_test)
        y_pred_proba = self.model.predict_proba(self.X_test)[:,1]
        metrics = {
            "Accuracy": accuracy_score(self.y_test, y_pred),
            "Precision": precision_score(self.y_test, y_pred),
            "Recall": recall_score(self.y_test, y_pred),
            "F1 Score": f1_score(self.y_test, y_pred),
            "ROC-AUC": roc_auc_score(self.y_test, y_pred_proba),
            "Confusion Matrix": confusion_matrix(self.y_test, y_pred).tolist()  # Convert to list for better readability
        }
        return metrics
    
        