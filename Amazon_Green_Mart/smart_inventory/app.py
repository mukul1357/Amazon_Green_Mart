from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from predict import parse_data, predict_next_day, load_model
from datetime import datetime
from dateutil import parser
import pandas as pd
import numpy as np

app = Flask(__name__)
api = Api(app)

demand_parser = reqparse.RequestParser()
demand_parser.add_argument('past_data', type=int, required=True, action='append')
demand_parser.add_argument('month', type=str, required=True)

demand_date_parser = reqparse.RequestParser()
demand_date_parser.add_argument('date', type=str, required=True)

months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

class DemandPrediction(Resource):
    def post(self):
        args = demand_parser.parse_args() 
        past_data = args['past_data']
        month = args['month']
        input = parse_data(past_data, month)
        # print(input)
        return {'result' : int(predict_next_day(input, load_model())[0][0])}

class GetDateDemand(Resource):
    def post(self):
        args = demand_date_parser.parse_args()
        date = parser.parse(args['date'])
        month = date.month
        day = date.day
        index = (month - 1) * 31 + day - 11
        if index < 0:
            return {'result': 'Error'}
        df = np.array(pd.read_csv('test_data.csv').drop(['Unnamed: 0'], axis='columns'))
        data = parse_data(df[index, :10], months[month-1])
        # print(data, index)
        print(list(data[0]))
        return {'result': int(predict_next_day(data, load_model())[0][0]), 'previous_data': data[0].tolist()}

class GetMonthlyData(Resource):
    def get(self):
        df = pd.read_csv('test_data.csv').drop(['Unnamed: 0', 'result'], axis='columns')
        initial_value = np.array(df)[0, :10]
        df = pd.get_dummies(df).astype(int)
        values = np.append(initial_value, predict_next_day(np.array(df), load_model()))
        sums = []
        average = 0
        for i in range(1, len(values) + 1):
            if i % 31 == 0:
                sums.append(average)
                average = 0
            average += values[i-1]
        return {'data': sums}


api.add_resource(DemandPrediction, '/demand')
api.add_resource(GetDateDemand, '/date')
api.add_resource(GetMonthlyData, '/monthly')

if __name__ == '__main__':
    app.run(debug=True, port=5001)