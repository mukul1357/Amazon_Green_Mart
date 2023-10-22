from flask import Flask, jsonify
from flask_restful import Api, Resource, reqparse, abort
from flask_sqlalchemy import SQLAlchemy
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
from sklearn.preprocessing import LabelEncoder
import xgboost as xgb
import pickle
import pandas as pd
import numpy as np


app = Flask(__name__)
api = Api(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

class Product(db.Model):
    __table_name__ = 'product'
    ID = db.Column(db.Integer, primary_key=True)
    Type = db.Column(db.Integer, nullable=False)
    Cotton = db.Column(db.Float, nullable=False)
    Organic_cotton = db.Column(db.Float, nullable=False)
    Linen = db.Column(db.Float, nullable=False)
    Hemp = db.Column(db.Float, nullable=False)
    Jute = db.Column(db.Float, nullable=False)
    Other_plant = db.Column(db.Float, nullable=False)
    Silk = db.Column(db.Float, nullable=False)
    Wool = db.Column(db.Float, nullable=False)
    Leather = db.Column(db.Float, nullable=False)
    Camel = db.Column(db.Float, nullable=False)
    Cashmere = db.Column(db.Float, nullable=False)
    Alpaca = db.Column(db.Float, nullable=False)
    Feathers = db.Column(db.Float, nullable=False)
    Other_animal = db.Column(db.Float, nullable=False)
    Polyester = db.Column(db.Float, nullable=False)
    Nylon = db.Column(db.Float, nullable=False)
    Acrylic = db.Column(db.Float, nullable=False)
    Spandex = db.Column(db.Float, nullable=False)
    Elastane = db.Column(db.Float, nullable=False)
    Polyamide = db.Column(db.Float, nullable=False)
    Other_synthetic = db.Column(db.Float, nullable=False)
    Lyocell = db.Column(db.Float, nullable=False)
    Viscose = db.Column(db.Float, nullable=False)
    Acetate = db.Column(db.Float, nullable=False)
    Modal = db.Column(db.Float, nullable=False)
    Rayon = db.Column(db.Float, nullable=False)
    Other_regenerated = db.Column(db.Float, nullable=False)
    Other = db.Column(db.Float, nullable=False)
    Recycled_content = db.Column(db.Float, nullable=False)
    Reused_content = db.Column(db.Float, nullable=False)
    Material_label = db.Column(db.Integer, nullable=False)
    Chemicals_label = db.Column(db.Integer, nullable=False)
    Production_label = db.Column(db.Integer, nullable=False)
    Manufacturing_location = db.Column(db.Integer)
    Transporation_distance = db.Column(db.Integer)
    Use_location = db.Column(db.Integer, nullable=False)
    Washing_instruction = db.Column(db.Integer, nullable=False)
    Drying_instruction = db.Column(db.Integer, nullable=False)
    Reusability_label = db.Column(db.Integer, nullable=False)
    Recylability_label = db.Column(db.Integer, nullable=False)
    
class Prediction(Resource):
    def get(self, id):
        with app.app_context():
            product = Product.query.get(id)
            # product = Product.query.first()  # Assuming you have a product object
            product_dict = {column.name: getattr(product, column.name) for column in Product.__table__.columns}
            
            df = pd.DataFrame.from_dict(product_dict, orient='index').T
            df = df.set_index('ID')
            print(df)

            X = df.to_numpy().astype(np.float64)
            model_file = 'random_forest_model.pkl'  
            with open(model_file, 'rb') as model_pkl:
                loaded_rf_model = pickle.load(model_pkl)
            y_pred = loaded_rf_model.predict(X)
            print("Mukul")
            print(y_pred)

            # Create and train the XGBoost classifier
            
            
            if product:
                # You can convert the product object to a dictionary or format it as needed.
                product_data = {
                    "Prediction": y_pred.tolist()
                }
                return jsonify(product_data)
            else:
                return {"message": "Product not found"}, 404  # Return a 404 response if the product is not found         
            
            
api.add_resource(Prediction, '/amazon/prediction/<int:id>')

if __name__ == '__main__':
    app.run(debug=True)