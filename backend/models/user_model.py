def user_schema(user):
    return {
        "id": str(user["_id"]),
        "firstName": user.get("firstName"),
        "lastName": user.get("lastName"),
        "email": user.get("email"),
        "country": user.get("country"),
        "userRole": user.get("userRole"),
        "category": user.get("category")
    }



