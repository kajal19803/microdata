from flask import Blueprint, request, jsonify
from controllers.query_controller import handle_query

query_blueprint = Blueprint('query_routes', __name__)

@query_blueprint.route('/api/query', methods=['GET', 'POST'])
def query_data():
    if request.method == 'GET':
        return jsonify({"message": "Use POST method with a query in the body."})
    return handle_query()  


