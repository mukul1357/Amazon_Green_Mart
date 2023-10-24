import requests

url = 'http://127.0.0.1:5000/amazon/prediction/8/0.8/0.3/0.0/0.0/1/0'

response = requests.get(url)

print(response.json())