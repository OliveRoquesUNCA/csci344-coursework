import json

from flask import Response, request
from flask_restful import Resource, reqparse, abort

from models import db
from models.comment import Comment


class CommentListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def post(self):
        # TODO: Add POST logic...

        parser = reqparse.RequestParser()
        parser.add_argument('post_id', required=True, location='json')
        parser.add_argument('text', required=True, location='json')
        args = parser.parse_args()
        new_comment = Comment(
            user_id=self.current_user.id,
            post_id=args.get('post_id'),
            text=args.get('text')
        )
        db.session.add(new_comment)
        db.session.commit()
        resp = Response(response=json.dumps(new_comment.to_dict()), mimetype="application/json", status=201)
        resp.headers['Content-type'] = 'application/json'
        return resp



class CommentDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def delete(self, id):
        print(id)

        comment = Comment.query.get(id)
        if not comment or comment.user_id != self.current_user.id:
            return Response(
                json.dumps({"message": "Comment does not exist or no access"}),
                mimetype="application/json",
                status=404,
            )
        else:
            Comment.query.filter_by(id=id).delete()
            db.session.commit()
            message = {'message':'successfully deleted comment'}
            resp = Response(response=json.dumps(message), mimetype="application/json", status=200)
            resp.headers['Content-type'] = 'application/json'
            return resp


def initialize_routes(api, current_user):
    api.add_resource(
        CommentListEndpoint,
        "/api/comments",
        "/api/comments/",
        resource_class_kwargs={"current_user": current_user},
    )
    api.add_resource(
        CommentDetailEndpoint,
        "/api/comments/<int:id>",
        "/api/comments/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )
