import pandas as pd
import pickle
import numpy as np
from typing import Dict, Any
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# load model 
model_path = os.path.join(os.path.dirname(__file__), 'models', '') 
