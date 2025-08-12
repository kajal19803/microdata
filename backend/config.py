import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["microdata"]
collection = db["documents"]
user_collection = db['users']
JWT_SECRET = os.getenv("JWT_SECRET")
