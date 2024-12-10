import json

from flask import Response, request
from flask_restful import Resource

from models.user import User
def get_path():
    return request.host_url + "api/posts/"


class ProfileDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):
        user = User.query.filter(User.id == self.current_user.id)
        data = user.first().to_dict()
        resp = Response(response=json.dumps(data), mimetype="application/json", status=200)
        resp.headers['Content-type'] = 'application/json'
        return resp


def initialize_routes(api, current_user):
    api.add_resource(
        ProfileDetailEndpoint,
        "/api/profile",
        "/api/profile/",
        resource_class_kwargs={"current_user": current_user},
    )
