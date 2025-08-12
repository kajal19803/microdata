from flask import request, jsonify
from config import collection
from utils.file_converter import to_csv, to_pdf

def handle_query():
    data = request.get_json()
    userType = data.get("userType")
    format = data.get("format", "csv")

    if not userType:
        return jsonify({"error": "userType missing"}), 400

    try:
        # Query MongoDB for documents matching userType (case-insensitive)
        results = list(collection.find(
            {"userType": {"$regex": f"^{userType}$", "$options": "i"}},
            {"_id": 0}  # exclude _id from output
        ))

        if not results:
            return jsonify({"message": "No matching records"}), 200

        # Convert to CSV or PDF
        filename = to_csv(results) if format == "csv" else to_pdf(results)

        return jsonify({
            "message": "Data ready",
            "downloadLink": f"/api/download/{filename}"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
