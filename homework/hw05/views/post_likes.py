import json

from flask import Response, request
from flask_restful import Resource, reqparse, abort

from models import db
from models.like_post import LikePost


class PostLikesListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('post_id', required=True, location='json')
        args = parser.parse_args()
        new_like = LikePost(
            user_id=self.current_user.id,
            post_id=args.get('post_id')
        )
        db.session.add(new_like)
        db.session.commit()
        resp = Response(response=json.dumps(new_like.to_dict()), mimetype="application/json", status=201)
        resp.headers['Content-type'] = 'application/json'
        return resp


class PostLikesDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def delete(self, id):
        print(id)
        like = LikePost.query.get(id)
        if not like or like.user_id != self.current_user.id:
            return Response(
                json.dumps({"message": "Like does not exist"}),
                mimetype="application/json",
                status=404,
            )
        else:
            LikePost.query.filter_by(id=id).delete()
            db.session.commit()
            message = {'message':'successfully deleted like'}
            resp = Response(response=json.dumps(message), mimetype="application/json", status=200)
            resp.headers['Content-type'] = 'application/json'
            return resp


def initialize_routes(api, current_user):
    api.add_resource(
        PostLikesListEndpoint,
        "/api/likes",
        "/api/likes/",
        resource_class_kwargs={"current_user": current_user},
    )

    api.add_resource(
        PostLikesDetailEndpoint,
        "/api/likes/<int:id>",
        "/api/likes/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )
