from app import app, db, Product2
from sklearn.preprocessing import LabelEncoder
import pandas as pd

def dataPreProcess(df):
    columns_to_label_encode = ['Appliance', 'Company', 'Materials_Used', 'Eco_Friendly_Certificate_1', 'Eco_Friendly_Certificate_2', 'Transportation_Mode']
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
        new_product = Product2(
            Appliance = row["Appliance"],
            Company = row["Company"],
            Energy_Consumption_kWh = row["Energy_Consumption_kWh"],
            Materials_Used = row["Materials_Used"],
            Manufacturing_Emissions_kg_CO2e = row["Manufacturing_Emissions_kg_CO2e"],
            Transportation_Mode = row["Transportation_Mode"],
            Distance_Traveled_km = row["Distance_Traveled_km"],
            Transportation_Emissions_kg_CO2e = row["Transportation_Emissions_kg_CO2e"],
            Energy_Efficiency = row["Energy_Efficiency"],
            Water_Consumption_gallons = row["Water_Consumption_gallons"],
            Energy_Star_Rating = row["Energy_Star_Rating"],
            Eco_Friendly_Certificate_1 = row["Eco_Friendly_Certificate_1"],
            Eco_Friendly_Certificate_2 = row["Eco_Friendly_Certificate_2"],
            Biodegradable_Packaging = row["Biodegradable_Packaging"]
        )
        db.session.add(new_product)
        db.session.commit()
        
if __name__ == '__main__':
    df = pd.read_csv('./Appliance_final.csv').set_index('Id')
    df = df.drop(axis = "columns", labels = "Eco_Friendliness")
    df = dataPreProcess(df)
    # print(df)
    with app.app_context():
        db.create_all()
        create_data(df)