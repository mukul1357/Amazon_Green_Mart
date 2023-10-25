# Amazon Green Mart

## Goal
Our primary objective is to drive sustainability and reduce the carbon footprint within Amazon's product delivery system. We aim to achieve this through a two-part solution that encompasses a Green Scorecard System and Smart Inventory Management.

## Solution Components

### 1. Green Scorecard System
The Green Scorecard System focuses on assessing and promoting the eco-friendliness of products available on Amazon. We achieve this by defining a set of eco-friendly parameters tailored to specific product categories. To predict eco-friendly ratings for products within each category, we employ specialized machine learning models. When customers make eco-friendly purchases, they earn green points, which can be redeemed on future Amazon orders. This system not only encourages eco-conscious buying but also incentivizes sustainable products.

### 2. Smart Inventory Management
Efficient inventory management plays a crucial role in our sustainability efforts. The Smart Inventory Management component is dedicated to reducing stockouts and surpluses. It leverages historical demand data spanning 20 years to accurately forecast seasonal demand patterns. In addition, it takes into account the most recent 10 days of data for real-time market trend analysis. This approach ensures optimal inventory levels, minimizes waste, and enhances the overall shopping experience for Amazon customers.

## Impact 
Our project seeks to not only reduce environmental impact but also enhance customer satisfaction, ultimately positioning Amazon as a leader in sustainable e-commerce practices. By providing eco-conscious choices and efficient inventory management, we aim to revolutionize the way Amazon and its customers interact with the environment.

# Technology Stack Used

## Front End
**React**: Our frontend is built using React, a popular JavaScript library for building user interfaces. React provides a flexible and efficient way to create dynamic web applications.

## Backend

**Flask**: We have chosen Flask as the web framework for our backend. Flask is a lightweight and versatile micro-framework that allows us to build web applications with ease.

**Keras**: Keras is a high-level neural networks API written in Python. It is the core component for implementing machine learning models in our project, particularly for eco-friendliness rating prediction.

**SQLite**: We use SQLite as our database management system. It's a lightweight, serverless, and self-contained database that fits well for small to medium-scale applications.

**scikit-learn (sklearn)**: scikit-learn is a machine learning library for Python. We utilize it for various machine learning tasks, including demand forecasting in our Smart Inventory Management component.

# Installation and Setup

## Dependencies
Before running the project, ensure you have the following dependencies installed on your system:

```bash
pip install Flask
pip install flask_sqlalchemy
pip install flask_restful
pip install xgboost
pip install pickle
pip install sklearn
pip install pandas
pip install numpy
```

# Setup

Follow these steps to setup the project:
```bash
git clone https://github.com/mukul1357/Amazon_Green_Mart.git
cd Amazon_Green_Mart
```

Now in the folder download dependencies
```bash
npm install
```
# Running the Project

## FrontEnd
Start the React development server:
```bash
npm start
```
## BackEnd
First navigate to the backend (green score card) directory:
```bash
cd backend
```
Now create the databases by running `python3 create_data.py` and `python3 create_data2.py`

Running the server:
Now to start the server run: `python3 app.py`


Now navigate to smart inventory management directory inside 'Amazon_Green_Mart' directory:
```bash
cd ..
cd Amazon_Green_Mart
cd smart_inventory
```
Now to start the server run: `python3 app.py`


 **Now the project is all set. You can interact with the front end and get desired results**
