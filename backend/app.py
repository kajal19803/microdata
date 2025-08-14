from flask import Flask
from flask_cors import CORS
from flask import send_file
from routes.query_routes import query_blueprint
from routes.upload_routes import upload_blueprint
from routes.auth_routes import auth_blueprint
import os

app = Flask(__name__)
CORS(app, origins=["https://microdata.vercel.app"])

@app.route('/')
def home():
    return "Flask backend running!"
app.register_blueprint(auth_blueprint)
app.register_blueprint(query_blueprint)
app.register_blueprint(upload_blueprint)
@app.route('/api/download/<filename>')
def download(filename):
    path = os.path.join("temp_downloads", filename)
    
    if not os.path.exists(path):
        return {"error": f"{filename} not found"}, 404

    return send_file(path, as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True)

