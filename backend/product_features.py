import openai
import json
import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv
import os
load_dotenv()

mongo_db_conn_str = os.getenv('MONGO_DB_CONN_STR')

# env and api setup
load_dotenv()
openai_api_key = os.getenv('OPENAI_API_KEY')
openai.api_key = openai_api_key

extract_features_prompt = """
We are provided with data of a product in a warehouse in Spain, which is the information from a row in the entire dataset. Your role is to extract meaningful features from the data. 
Provided the following product details as input: {product_details}

Extract the following features from the product details:
- Original full name
- Original full name translated (with company name in original language, product name translated to English, and SI units for product unit)
- Company name (original language)
- Product type (in English, what category/type of product it is, e.g. shampoo, soap, etc.)
- Product description: size (in SI units) and unit (e.g. 100 ml, 1 kg, etc.) explained in a concise manner, e.g., the package contains 60 tablets. 

Ensure that the company name remains same and is not being translated. If any of the features is not present in the product details, set its value to "N/A".
Only output a tuple of the following format: (original full name, original full name translated, company name, product type, product description)
"""

# @return: (original full name, original full name translated, company name, product type, product description)
def extract_features(product_details) -> list[tuple]:
    extract_features_prompt_updated = extract_features_prompt.format(product_details=product_details)
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        temperature=0, 
        messages=[{"role": "system", "content": extract_features_prompt_updated}]
    )

    return response.choices[0].message.content

# function to add extracted features as a field data to mongodb
def add_extracted_features_to_db():
    # Create a MongoDB client
    client = MongoClient(mongo_db_conn_str)
    collection = client["warehouse_db"]["data_col"]

    # get documents from the collection and extract features for each doc from field 'name' and save it in field 'data'
    for doc in collection.find():
        product_details = doc['name']
        extracted_features = extract_features(product_details=product_details)
        doc['data'] = extracted_features
        collection.replace_one({'_id': doc['_id']}, doc)

    client.close()


## Testing

add_extracted_features_to_db()

