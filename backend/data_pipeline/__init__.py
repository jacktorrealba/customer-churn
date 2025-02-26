from .data_cleaning import DataCleaner
from .feature_engineering import FeatureEngineer
from .model import ModelTrainer

class Pipeline:
    def __init__(self):
        self.cleaner = DataCleaner()
        self.feature_engineer = FeatureEngineer()
        self.model_trainer = ModelTrainer()
    def run_pipeline(self, raw_data):
        cleaned_data = self.cleaner.clean(raw_data)
        featured_data = self.feature_engineer.create_features(cleaned_data)
        model = self.model_trainer.train(featured_data)
        return model