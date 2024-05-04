from pymongo import MongoClient
import random
from dotenv import load_dotenv
import os
load_dotenv()

mongo_db_conn_str = os.getenv('MONGO_DB_CONN_STR')

# env and api setup
load_dotenv()

def add_fields_to_documents():
    # Load MongoDB connection string from environment variable
    load_dotenv()
    mongo_db_conn_str = os.getenv('MONGO_DB_CONN_STR')

    # Establish connection to MongoDB
    client = MongoClient(mongo_db_conn_str)
    collection = client["warehouse_db"]["data_col"]

    # Define list of locations
    locations = ["A3201", "A3202","A3203","A3205","A3101","A3102","A3103","A3106","A3105","A3104"]

    # Iterate over each document in the collection
    for document in collection.find():
        # Generate random quantity and location
        quantity = random.randint(5, 12)
        location = random.choice(locations)

        # Add new fields to the document
        collection.update_one({'_id': document['_id']}, {'$set': {'quantity': quantity, 'location': location}})

    # Close the MongoDB connection
    client.close()

add_fields_to_documents()