import openai
from dotenv import load_dotenv
import tiktoken
from pymongo import MongoClient
import os
load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")
mongo_db_conn_str = os.getenv('MONGO_DB_CONN_STR')


def create_embedding(text: str) -> list[float]:

    # Logic to limit the number of tokens
    MAX_TOKENS = 8192 - 1
    encoding_model = tiktoken.encoding_for_model("gpt-3.5-turbo")
    encoding = encoding_model.encode(text)
    num_tokens = len(encoding)


    if num_tokens > MAX_TOKENS:  # assuming each word is a token
        encoding = encoding[:(MAX_TOKENS)]  # truncate to the maximum tokens
        text = encoding_model.decode(encoding)
    # print(f"Number of tokens: {num_tokens}")
    # print(f"Text: {text}")
    response = openai.embeddings.create(
        model="text-embedding-ada-002",
        input=text
    ).data[0].embedding
    return response


def insert_or_update_all_embeddings(field_to_embed = 'data'):
    client = MongoClient(mongo_db_conn_str)
    db = client["warehouse_db"]["data_col"]
    for doc in db.find({'$and': [{field_to_embed: {'$exists': True}}, {'embedding': {'$exists': False}}]}):
        doc[f'embedding_{field_to_embed}'] = create_embedding(doc[field_to_embed])
        db.replace_one({'_id': doc['_id']}, doc)
        print(f"Document with _id: {doc['_id']} updated.")
    client.close()



# insert_or_update_all_embeddings()