from flask import Blueprint
from controllers.auth_controller import register_user, login_user

auth_blueprint = Blueprint("auth_routes", __name__)

@auth_blueprint.route("/api/register", methods=["POST"])
def register():
    return register_user()

@auth_blueprint.route("/api/login", methods=["POST"])
def login():
    return login_user()
