import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv
import os
load_dotenv()

mongo_db_conn_str = os.getenv('MONGO_DB_CONN_STR')

def csv_to_mongodb(csv_file_path):
    # Create a MongoDB client
    client = MongoClient(mongo_db_conn_str)
    collection = client["warehouse_db"]["data_col"]

    # Read the CSV file
    # Read the CSV file
    df = pd.read_csv(csv_file_path, delimiter=';', quotechar='"')

    # Convert the DataFrame to a list of dictionaries
    list_of_dict = df.to_dict('records')
    # print(list_of_dict)

    # Insert the data into the MongoDB collection
    collection.insert_many(list_of_dict)

csv_to_mongodb("data/products.csv")