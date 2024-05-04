from langchain_openai import OpenAIEmbeddings
from langchain_community.document_loaders  import WebBaseLoader
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_mongodb import MongoDBAtlasVectorSearch
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from langchain_chroma import Chroma

load_dotenv()
openai_api_key = os.getenv('OPENAI_API_KEY')
mongo_db_conn_str = os.getenv('MONGO_DB_CONN_STR')

# Step 1: Load
loaders = [
 WebBaseLoader("https://en.wikipedia.org/wiki/AT%26T"),
 WebBaseLoader("https://en.wikipedia.org/wiki/Bank_of_America")
]
data = []
for loader in loaders:
    data.extend(loader.load())

# Step 2: Transform (Split)
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=0, separators=[
                                               "\n\n", "\n", "(?<=\\. )", " "], length_function=len)
docs = text_splitter.split_documents(data)

# Step 3: Embed
embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)

# Step 4: Store
client = MongoClient(mongo_db_conn_str)
collection = client["warehouse_db"]["data_col"]

# Reset w/out deleting the Search Index 
collection.delete_many({})

# Insert the documents in MongoDB Atlas with their embedding
vector_search = MongoDBAtlasVectorSearch.from_documents(
    documents=docs, embedding=embeddings, collection=collection, index_name="data_index"
)

# MONGODB ATLAS TODO NOT WORKING
results = vector_search.similarity_search_with_score(query="Who founded AT&T?", k=5)
for result in results:
    doc, score = result
    print(f"Document: {doc}, Score: {score}")

client.close()