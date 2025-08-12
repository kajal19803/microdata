import jwt
import datetime
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from bson import ObjectId
from config import user_collection, JWT_SECRET
from models.user_model import user_schema

ADMIN_EMAIL = "kajalverma6263@gmail.com"  
def register_user():
    data = request.get_json()

    required = ["firstName", "lastName", "email", "country", "password", "confirmPassword", "category"]
    if not all(k in data for k in required):
        return jsonify({"error": "All fields are required"}), 400

    if data["password"] != data["confirmPassword"]:
        return jsonify({"error": "Passwords do not match"}), 400

    if user_collection.find_one({"email": data["email"]}):
        return jsonify({"error": "Email already registered"}), 409

    hashed_pw = generate_password_hash(data["password"])

    # System role: admin/user
    system_role = "admin" if data["email"].lower() == ADMIN_EMAIL.lower() else "user"

    new_user = {
        "firstName": data["firstName"],
        "lastName": data["lastName"],
        "email": data["email"],
        "country": data["country"],
        "password": hashed_pw,
        "userRole": system_role,  # admin or user
        "category": data["category"]  # citizen/policymaker/researcher
    }

    user_collection.insert_one(new_user)
    return jsonify({"message": "Registration successful"}), 201

def login_user():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = user_collection.find_one({"email": email})
    if not user or not check_password_hash(user["password"], password):
        return jsonify({"error": "Invalid credentials"}), 401

    payload = {
        "user_id": str(user["_id"]),
        "email": user["email"],
        "role": user.get("userRole", "user"),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
    }

    token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")

    return jsonify({
        "message": "Login successful",
        "token": token,
        "role": user.get("userRole", "user"),
        "user": user_schema(user)
    }), 200
