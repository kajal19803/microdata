from flask import Blueprint
from controllers.upload_controller import handle_upload

upload_blueprint = Blueprint('upload_routes', __name__)
upload_blueprint.route('/api/upload', methods=['POST'])(handle_upload)
