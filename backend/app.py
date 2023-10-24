from flask import Flask, jsonify
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
import pickle
import pandas as pd
import numpy as np
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app)
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

class Product2(db.Model):
    Id = db.Column(db.Integer, primary_key=True)
    Appliance = db.Column(db.Float, nullable=False)
    Company = db.Column(db.Float, nullable=False)
    Energy_Consumption_kWh = db.Column(db.Float, nullable=False)
    Materials_Used = db.Column(db.Float, nullable=False)
    Manufacturing_Emissions_kg_CO2e = db.Column(db.Float, nullable=False)
    Transportation_Mode = db.Column(db.Float, nullable=False)
    Distance_Traveled_km = db.Column(db.Float, nullable=False)
    Transportation_Emissions_kg_CO2e = db.Column(db.Float, nullable=False)
    Energy_Efficiency = db.Column(db.Float, nullable=False)
    Water_Consumption_gallons = db.Column(db.Float, nullable=False)
    Energy_Star_Rating = db.Column(db.Float, nullable=False)
    Eco_Friendly_Certificate_1 = db.Column(db.Float, nullable=False)
    Eco_Friendly_Certificate_2 = db.Column(db.Float, nullable=False)
    Biodegradable_Packaging = db.Column(db.Float, nullable=False)
    
class Prediction(Resource):
    def get(self, id, cotton, silk, polyester, nylon, reuse, recycle):
        print(id, cotton, silk, polyester, nylon, reuse, recycle)
        with app.app_context():
            product = Product.query.get(id)
            product_dict = {column.name: getattr(product, column.name) for column in Product.__table__.columns}
            
            df = pd.DataFrame.from_dict(product_dict, orient='index').T
            df = df.set_index('ID')
            df['Cotton'] = cotton
            df['Silk'] = silk
            df['Polyester'] = polyester
            df['Nylon'] = nylon
            df['Recycled_content'] = recycle
            df['Reused_content'] = reuse
            print(df)
            X = df.to_numpy().astype(np.float64)
            model_file = 'random_forest_model.pkl'  
            with open(model_file, 'rb') as model_pkl:
                loaded_rf_model = pickle.load(model_pkl)
            y_pred = loaded_rf_model.predict(X)
            if product:
                product_data = {
                    "Prediction": 6-y_pred.tolist()[0]
                }
                return jsonify(product_data)
            else:
                return {"message": "Product not found"}, 404


class Prediction2(Resource):
    def get(self, id, energy_star, energy_consumption, certi_1, certi2):
        with app.app_context():
            product = Product2.query.get(id)
            product_dict = {column.name: getattr(product, column.name) for column in Product2.__table__.columns}
            
            df = pd.DataFrame.from_dict(product_dict, orient='index').T
            df = df.set_index('Id')
            
            df['Energy_Star_Rating'] = energy_star
            df['Energy_Consumption_kWh'] = energy_consumption
            df['Eco_Friendly_Certificate_1'] = certi_1
            df['Eco_Friendly_Certificate_2'] = certi2
            
            X = df.to_numpy().astype(np.float64)

            model_file = 'NN.pkl'  
            with open(model_file, 'rb') as model_pkl:
                loaded_model = pickle.load(model_pkl)
            
            y_pred = loaded_model.predict(X)
            
            with open('label_encoder.pkl', 'rb') as le_file:
                label_encoder = pickle.load(le_file)
            y_pred_correct = label_encoder.inverse_transform(y_pred)
            if product:
                product_data = {
                    "Prediction": y_pred_correct.tolist()[0]
                }
                return jsonify(product_data)
            else:
                return {"message": "Product not found"}, 404
            
            
api.add_resource(Prediction, '/amazon/prediction/<int:id>/<float:cotton>/<float:silk>/<float:polyester>/<float:nylon>/<int:reuse>/<int:recycle>')
api.add_resource(Prediction2, '/amazon/prediction2/<int:id>/<float:energy_star>/<float:energy_consumption>/<float:certi_1>/<float:certi2>')

if __name__ == '__main__':
    app.run(debug=True)