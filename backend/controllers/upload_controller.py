import os, uuid, zipfile
from flask import request, jsonify
from config import collection
from utils.html_parser import extract_html_data

UPLOAD_DIR = "./uploads"

def handle_upload():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    zip_file = request.files['file']
    session_id = str(uuid.uuid4())
    extract_path = os.path.join(UPLOAD_DIR, session_id)
    os.makedirs(extract_path, exist_ok=True)

    zip_path = os.path.join(extract_path, zip_file.filename)
    zip_file.save(zip_path)

    # Extract all HTMLs
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_path)

    extracted = extract_html_data(extract_path)

    if not extracted:
        return jsonify({"error": "No HTML data extracted"}), 400

    #  Save directly to MongoDB
    collection.insert_many(extracted)

    return jsonify({
        "message": "Upload successful",
        "inserted": len(extracted)
    })
