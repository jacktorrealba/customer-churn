
class ModelPredictor:
    def __init__(self):
        # initialize model and scalar
        self.model = None
        self.scalar = None
        # load the model when the class is initialized
        self.load_model()
        
   
        