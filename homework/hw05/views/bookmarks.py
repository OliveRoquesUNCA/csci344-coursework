import json

from flask import Response, request
from flask_restful import Resource, reqparse, abort

from models import db
from models.bookmark import Bookmark


class BookmarksListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):
        # TODO: Add GET Logic...
        bookmarks = Bookmark.query.filter(Bookmark.user_id == self.current_user.id)
        data = [item.to_dict() for item in bookmarks.all()]
        resp = Response(response=json.dumps(data), mimetype="application/json", status=200)
        resp.headers['Content-type'] = 'application/json'
        return resp

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('post_id', required=True, location='json')
        args = parser.parse_args()
        new_bookmark = Bookmark(
            user_id=self.current_user.id,
            post_id=args.get('post_id')
        )
        db.session.add(new_bookmark)
        db.session.commit()
        resp = Response(response=json.dumps(new_bookmark.to_dict()), mimetype="application/json", status=201)
        resp.headers['Content-type'] = 'application/json'
        return resp


class BookmarkDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def delete(self, id):
        print(id)

        bookmark = Bookmark.query.get(id)
        if not bookmark or bookmark.user_id != self.current_user.id:
            return Response(
                json.dumps({"message": "Bookmark does not exist"}),
                mimetype="application/json",
                status=404,
            )
        else:
            Bookmark.query.filter_by(id=id).delete()
            db.session.commit()
            message = {'message':'successfully deleted bookmark'}
            resp = Response(response=json.dumps(message), mimetype="application/json", status=200)
            resp.headers['Content-type'] = 'application/json'
            return resp


def initialize_routes(api, current_user):
    api.add_resource(
        BookmarksListEndpoint,
        "/api/bookmarks",
        "/api/bookmarks/",
        resource_class_kwargs={"current_user": current_user},
    )

    api.add_resource(
        BookmarkDetailEndpoint,
        "/api/bookmarks/<int:id>",
        "/api/bookmarks/<int:id>",
        resource_class_kwargs={"current_user": current_user},
    )
