from keras import Sequential
from keras.layers import Dense, LSTM
import pandas as pd
import numpy as np

def load_model():
    model = Sequential() # 4 layers = train 115, test 132 | 5 layers = test 149 overfit
    model.add(LSTM(32, input_shape=(22, 1), return_sequences=True))
    model.add(LSTM(32))
    model.add(Dense(32))
    model.add(Dense(1))
    model.compile(loss='mean_squared_error', optimizer='adam')
    model.load_weights('models/nn')
    return model

def predict_next_day(x, model):
    return model.predict(x)

def parse_data(data, month):
    data = np.array(data).reshape(1, 10).astype(int)
    df = pd.DataFrame(data, columns=range(1, 11))
    df['month'] = np.array(month, str)
    months = np.array([month, 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'])
    df = pd.concat([df] * 13, ignore_index=True)
    df['month'] = months
    df = pd.get_dummies(df).astype(int)
    # print(df['month_feb'])
    return np.array(df)

def load_data():
    df = pd.read_csv('test_data.csv')
    df = pd.get_dummies(df).astype(int)
    # print(df.drop(['result'], axis='columns').columns)
    return np.array(df.drop(['result', 'Unnamed: 0'], axis='columns')), np.array(df['result']).reshape(-1, 1)

if __name__ == '__main__':
    x, y = load_data()
    print(predict_next_day(x, load_model()))    
