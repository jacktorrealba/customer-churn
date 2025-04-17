
import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pandas as pd
import traceback
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)
CORS(app, resources={r"/*": {
    "origins": [
        "http://localhost:3000",
        "https://customer-churn-three.vercel.app"
        ], 
    "methods": ["GET", "POST", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization"]
}})

# load model
model_path = os.path.join(os.path.dirname(__file__), 'model', 'churn_model.pkl') 
# load scaler
scaler_path = os.path.join(os.path.dirname(__file__), 'model', 'scaler.pkl')


# check if a scaler exists
if os.path.exists(scaler_path):
    with open(scaler_path, 'rb') as file:
        scaler = pickle.load(file)
    print("Success: Scaler loaded!")
else:
    print("No saved scaler found, creating a new one")
    scaler = StandardScaler()
    
# check if we have a model in the directory give
if os.path.exists(model_path):
    # open the file in binary read mode
    with open(model_path, 'rb') as file:
        # load the model from the file
        loaded_object = pickle.load(file)
        #print(loaded_object)
        # if the model is in a dictionary.. extract it
        if isinstance(loaded_object, dict):
            model = loaded_object.get('model', None)  # Extract only the model
            if model is None:
                print("Error: Model not found in dictionary!")
        else:
            model = loaded_object
    if hasattr(model, "predict"):
        print("Success: Model loaded!")
        
        # store the feature names used in training
        feature_names = loaded_object.get('feature_names', None)
        
    else:
        print("Model is not the correct type")
        model = None
        feature_names = None
else:
    print("Failed to find the model file")
    model = None
    feature_names = None

def feature_engineer(form_data):
    # copy the data 
    data = form_data.copy()

    # convert to dataframe to apply feature engineering techniques
    df = pd.DataFrame.from_dict([data])

    # == count number of services ==
    services = ['PhoneService', 'MultipleLines', 'OnlineSecurity','OnlineBackup', 'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies', 'PaperlessBilling', 'InternetService_dsl', 'InternetService_fiberoptic']
    df['count_of_services'] = (df[services].iloc[0] == 1).sum()

    # == binning customer tenure ==
    if 0 <= int(df['Tenure'].iloc[0]) <= 12: # if they are between 0 and 12 -> new customer
        df['TenureCategory_new_customer'] = 1
        df['TenureCategory_1_to_3yr_customer'] = 0
        df['TenureCategory_3_plus_customer'] = 0
    elif 13 <= int(df['Tenure'].iloc[0]) <= 36: # if they are between 13 and 36 -> 1 to 3yr customer
        df['TenureCategory_new_customer'] = 0
        df['TenureCategory_1_to_3yr_customer'] = 1
        df['TenureCategory_3_plus_customer'] = 0
    else: # anything greater than 36 -> 3 plus yr customer
        df['TenureCategory_new_customer'] = 0
        df['TenureCategory_1_to_3yr_customer'] = 0
        df['TenureCategory_3_plus_customer'] = 1
    
    # == binning monthly charges into package tiers ==
    if 0 < int(df['MonthlyCharges'].iloc[0]) <= 30: 
        df['PackageTier_basic'] = 1
        df['PackageTier_mid_tier'] = 0
        df['PackageTier_premium'] = 0
        df['PackageTier_high_end'] = 0
    elif 31 < int(df['MonthlyCharges'].iloc[0]) <= 70: 
        df['PackageTier_basic'] = 0
        df['PackageTier_mid_tier'] = 1
        df['PackageTier_premium'] = 0
        df['PackageTier_high_end'] = 0
    elif 71 < int(df['MonthlyCharges'].iloc[0]) <= 100: 
        df['PackageTier_basic'] = 0
        df['PackageTier_mid_tier'] = 0
        df['PackageTier_premium'] = 1
        df['PackageTier_high_end'] = 0
    else: 
        df['PackageTier_basic'] = 0
        df['PackageTier_mid_tier'] = 0
        df['PackageTier_premium'] = 0
        df['PackageTier_high_end'] = 1
    
    # numeric features for scaling
    float_features = ['MonthlyCharges', 'TotalCharges']   
    df[float_features] = scaler.fit_transform(df[float_features]).astype(float)

    df = df[feature_names]
    
    # return the feature engineered data
    return df


# create route for the app
@app.route('/predict', methods=['POST'])
def predict():
   
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500
    
    try:
        # get data from json request
        data = request.get_json()
        
        # perform feature engineering
        input_df = feature_engineer(data)

        #print(f"Input DataFrame shape: {input_df.shape}")
        #print(f"Input DataFrame columns: {input_df.columns}")
        
        if feature_names is not None:
            input_df = input_df[feature_names]
        
        # make prediction
        prediction = model.predict(input_df)[0]
        
        # store the results
        result = {
            'prediction': bool(prediction)
        }
        
        #return results as json
        return jsonify(result)
    
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 400

# make dir if it doesn't exist
os.makedirs(os.path.join(os.path.dirname(__file__), 'model'), exist_ok=True)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0',port=port)
    
