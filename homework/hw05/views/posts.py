import json

from flask import Response, request
from flask_restful import Resource, reqparse, abort

from models import db
from models.post import Post
from views import get_authorized_user_ids


def get_path():
    return request.host_url + "api/posts/"


class PostListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):
        ids_for_me_and_my_friends = get_authorized_user_ids(self.current_user)
        posts = Post.query.filter(Post.user_id.in_(ids_for_me_and_my_friends))
        parser = reqparse.RequestParser()
        parser.add_argument('limit', location='args')
        args = parser.parse_args()
        limit = args.get('limit')
        print("limit is "+ limit)
        if limit is not None:
             posts = posts.limit(limit)
        data = [item.to_dict(user=self.current_user) for item in posts.all()]
        resp = Response(response=json.dumps(data), mimetype="application/json", status=200)
        resp.headers['Content-type'] = 'application/json'
        return resp

    def post(self):
        #get api params
        parser = reqparse.RequestParser()
        parser.add_argument('image_url', required=True, location='json')
        parser.add_argument('caption', location='json')
        parser.add_argument('alt_text', location='json')
        args = parser.parse_args()

        new_post = Post(
            image_url=args.get('image_url'),
            user_id=self.current_user.id,
            caption=args.get('caption'),
            alt_text=args.get('alt_text')
        )
        db.session.add(new_post)
        db.session.commit()

        return Response(json.dumps(new_post.to_dict()), mimetype="application/json", status=201)


class PostDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def patch(self, id):
        print("POST id=", id)
        #get api params
        parser = reqparse.RequestParser()
        parser.add_argument('image_url', location='json')
        parser.add_argument('caption', location='json')
        parser.add_argument('alt_text', location='json')
        args = parser.parse_args()
        #get post to update
        ids_for_me_and_my_friends = get_authorized_user_ids(self.current_user)
        try:
            post = Post.query.filter(Post.user_id.in_(ids_for_me_and_my_friends), Post.id==id)
            data = post.first()
            data.image_url = args.get('image_url')
            data.caption = args.get('caption')
            data.alt_text = args.get('alt_text')

            db.session.commit()
            data = data.to_dict()
            resp = Response(response=json.dumps(data), mimetype="application/json", status=200)
            resp.headers['Content-type'] = 'application/json'
            return resp
        except:
            abort(404)

    def delete(self, id):
        print("POST id=", id)
        post = Post.query.get(id)
        if not post or post.user_id != self.current_user.id:
            return Response(
                json.dumps({"message": "Post does not exist or no access"}),
                mimetype="application/json",
                status=404,
            )
        else:
            Post.query.filter_by(id=id).delete()
            db.session.commit()
            message = {'message':'successfully deleted post'}
            resp = Response(response=json.dumps(message), mimetype="application/json", status=200)
            resp.headers['Content-type'] = 'application/json'
            return resp

    def get(self, id):
        print("post_id=", id)
        post_id=id
        ids_for_me_and_my_friends = get_authorized_user_ids(self.current_user)
        post = Post.query.filter(Post.user_id.in_(ids_for_me_and_my_friends), Post.id==post_id)
        try:
            data = post.first().to_dict()
            resp = Response(response=json.dumps(data), mimetype="application/json", status=200)
            resp.headers['Content-type'] = 'application/json'
            return resp
        except AttributeError:
            abort(404, message="post id not found")


def initialize_routes(api, current_user):
    api.add_resource(
        PostListEndpoint,
        "/api/posts",
        "/api/posts/",
        resource_class_kwargs={"current_user": current_user},
    )
    api.add_resource(
        PostDetailEndpoint,
        "/api/posts/<int:id>",
        "/api/posts/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )
