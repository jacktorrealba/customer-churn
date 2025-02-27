
import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pandas as pd
from sklearn.preprocessing import OneHotEncoder

app = Flask(__name__)
CORS(app, resources={r"/*": {
    "origins": "http://localhost:3000",  # react url 
    "methods": ["GET", "POST", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization"]
}})

# load model 
model_path = os.path.join(os.path.dirname(__file__), 'model', 'churn_model.pkl') 

# check if we have a model in the directory give
if os.path.exists(model_path):
    # open the file in binary read mode
    with open(model_path, 'rb') as file:
        # load the model from the file
        model = pickle.load(file)
    print("Success: Model loaded!")
else:
    print("Failed to find the model file")
    model = None
    
def feature_engineer(form_data):
    # copy the data 
    data = form_data.copy()

    # convert to dataframe to apply feature engineering techniques
    df = pd.DataFrame.from_dict([data])

    # == one hot encoding category features ==
    category_features = ['InternetService', 'Contract', 'PaymentMethod']
    
    # strip whitespace
    df['InternetService'] = df['InternetService'].str.split().str.join('')
    df['Contract'] = df['Contract'].str.split().str.join('')
    df['PaymentMethod'] = df['PaymentMethod'].str.split().str.join('')
    
    # define encoder
    encoder = OneHotEncoder(sparse_output=False)
    one_hot_encoded = encoder.fit_transform(df[category_features])
    one_hot_df = pd.DataFrame(one_hot_encoded, columns=encoder.get_feature_names_out(category_features))
    df_new = pd.concat([df, one_hot_df], axis=1)
    df_new = df_new.drop(category_features, axis=1)
    
    # == count number of services ==
    # define the services
    services = ['PhoneService', 'MultipleLines', 'OnlineSecurity','OnlineBackup', 'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies', 'PaperlessBilling']
    df_new['count_of_services'] = (df_new[services].iloc[0] == 1).sum()

    # == binning customer tenure ==
    # check what bin the customer belongs to
    if 0 < int(df_new['Tenure'].iloc[0]) <= 12: # if they are between 0 and 12 -> new customer
        df_new['new_customer'] = 1
        df_new['1_to_3yr_customer'] = 0
        df_new['3_plus_customer'] = 0
    elif 13 < int(df_new['Tenure'].iloc[0]) <= 36: # if they are between 13 and 36 -> 1 to 3yr customer
        df_new['new_customer'] = 0
        df_new['1_to_3yr_customer'] = 1
        df_new['3_plus_customer'] = 0
    else: # anything greater than 36 -> 3 plus yr customer
        df_new['new_customer'] = 0
        df_new['1_to_3yr_customer'] = 0
        df_new['3_plus_customer'] = 1
    
    # == binning monthly charges into package tiers ==
    package_tier = [0, 30, 70, 100, 120]
    package_tier_labels = ['basic', 'mid_tier', 'premium', 'high_end']
    df_new['PackageTier'] = pd.cut(df_new['MonthlyCharges'], bins=package_tier, labels=package_tier_labels)
    
    # return the feature engineered data
    data = df_new.to_dict('index')
    print('reached the end')
    return data

# create route for the app
@app.route('/predict', methods=['POST'])
def predict():
   
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500
    
    try:
        # get data from json request
        data = request.get_json()
        #print(data)
        
        #features = data['features']
        
        features_arr = feature_engineer(data)
        #print(features_arr)
        
        # convert to numpy array
        input_features = np.array(features_arr).reshape(1,-1)
        print(model)
        
        # make prediction
        prediction = model.predict(input_features)[0]
        
        # store the results
        result = {
            'prediction': int(prediction)
        }
        
        result.headers.add("Access-Control-Allow-Origin", "*")
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# make dir if it doesn't exist
os.makedirs(os.path.join(os.path.dirname(__file__), 'model'), exist_ok=True)

if __name__ == '__main__':
    app.run(debug=True,port=5000)
    
