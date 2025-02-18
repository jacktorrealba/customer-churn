
import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

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

# create route for the app
@app.route('/api/predict', methods=['POST'])
def predict():
    # check if the model exists
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500
    
    try:
        # get data from json request
        data = request.get_json()
        features = [float(data.get(f'feature_{i+1}', 0)) for i in range(model.n_features_in_)]
        
        # convert to numpy array
        input_features = np.array(features).reshape(1,-1)
        
        # make prediction
        prediction = model.predict(input_features)[0]
        
        # store the results
        result = {
            'prediction': int(prediction)
        }
        
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# make dir if it doesn't exist
os.makedirs(os.path.join(os.path.dirname(__file__), 'model'), exist_ok=True)

if __name__ == '__main__':
    app.run(debug=True)
    
