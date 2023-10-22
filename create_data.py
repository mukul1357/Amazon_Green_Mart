from app import app, db, Product
from sklearn.preprocessing import LabelEncoder
import pandas as pd

def dataPreProcess(df):
    columns_to_label_encode = ["Type", "Manufacturing_location", "Use_location", "Washing_instruction", "Drying_instruction"]
    label_encoders = {}
    for column in columns_to_label_encode:
        label_encoder = LabelEncoder()
        df[column] = label_encoder.fit_transform(df[column])
        label_encoders[column] = label_encoder

    for column_name in df.columns:
        if(df[column_name].dtype == bool):
            df[column_name] = df[column_name].astype(int)
    
    return df

def create_data(df):
    for index, row in df.iterrows():
        new_product = Product(
            Type = row["Type"],
            Cotton = row["Cotton"],
            Organic_cotton = row["Organic_cotton"],
            Linen = row["Linen"],
            Hemp = row["Hemp"],
            Jute = row["Jute"],
            Other_plant = row["Other_plant"],
            Silk = row["Silk"],
            Wool = row["Wool"],
            Leather = row["Leather"],
            Camel = row["Camel"],
            Cashmere = row["Cashmere"],
            Alpaca = row["Alpaca"],
            Feathers = row["Feathers"],
            Other_animal = row["Other_animal"],
            Polyester = row["Polyester"],
            Nylon = row["Nylon"],
            Acrylic = row["Acrylic"],
            Spandex = row["Spandex"],
            Elastane = row["Elastane"],
            Polyamide = row["Polyamide"],
            Other_synthetic = row["Other_synthetic"],
            Lyocell = row["Lyocell"],
            Viscose = row["Viscose"],
            Acetate = row["Acetate"],
            Modal = row["Modal"],
            Rayon = row["Rayon"],
            Other_regenerated = row["Other_regenerated"],
            Other = row["Other"],
            Recycled_content = row["Recycled_content"],
            Reused_content = row["Reused_content"],
            Material_label = row["Material_label"],
            Chemicals_label = row["Chemicals_label"],
            Production_label = row["Production_label"],
            Manufacturing_location = row["Manufacturing_location"],
            Transporation_distance = row["Transporation_distance"],
            Use_location = row["Use_location"],
            Washing_instruction = row["Washing_instruction"],
            Drying_instruction = row["Drying_instruction"],
            Reusability_label = row["Reusability_label"],
            Recylability_label = row["Recylability_label"]
        )
        db.session.add(new_product)
        db.session.commit()
        
if __name__ == '__main__':
    df = pd.read_excel('./dataset.xlsx').set_index('ID')
    df = df.drop(axis = "columns", labels = "EI")
    df = dataPreProcess(df)
    with app.app_context():
        db.create_all()
        create_data(df)