from vectorising_db import create_embedding
from dotenv import load_dotenv
from pymongo import MongoClient
import os
load_dotenv()

mongo_db_conn_str = os.getenv('MONGO_DB_CONN_STR')


def similarity_search(query, limit=5):
    client = MongoClient(mongo_db_conn_str)
    db = client["warehouse_db"]["data_col"]
    field = 'embedding_data'
    results = db.aggregate([
    {
        "$vectorSearch": {
        "index": f"data_index",
        "path": f"{field}",
        "queryVector": create_embedding(query),
        "numCandidates": 100,
        "limit": limit
        }
    },
    {
            "$project": {
                "_id": 1,  # Include the _id field
                "name": 1,  # Include the l field
                "data": 1,  # Include the data field
                # "embedding_l": 1,  # Include the embedding field
                "ean": 1,  # Include the img field
                "score": {
                    "$meta": "vectorSearchScore"  # Include the search score
                }
            }
        }
    ])
    #allow only results with a score above 0.65
    results = filter(lambda x: x["score"] > 0.65, results)
    return list(results)

# Test similarity_search
# query = " hello"
# res = similarity_search(query)
# for document in res:
#     print(f'ID: {document["name"]},\EAN: {document["ean"]}\n, Data: {document["data"]},\nScore: {document["score"]}\n\n')

