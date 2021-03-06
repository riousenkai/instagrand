from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post, Follow, User, db, Comment, Like
from datetime import datetime
from app.aws_s3 import *
import boto3
import botocore

post_routes = Blueprint('posts', __name__)

@post_routes.route('/id/<int:id>')
@login_required
def spec_posts(id):
    post = Post.query.get(id)

    likes_comp = []
    comment_comp = []

    user = User.query.filter_by(id=post.user_id).first()

    likes = Like.query.filter_by(post_id=post.id).all()
    for like in likes:
        user2 = User.query.filter_by(id=like.user_id).first()
        likes_comp.append(user2.to_dict())

    comments = Comment.query.filter_by(post_id=post.id).all()
    for comment in comments:
        user3 = User.query.filter_by(id=comment.user_id).first()
        comment_comp.append({'comment': comment.to_dict(), 'user': user3.to_dict()})

    return {'specific': {'post': post.to_dict(), 'likes': likes_comp, 'comments': comment_comp, 'user': user.to_dict()}}

@post_routes.route('/<int:id>')
@login_required
def posts(id):
    posts = Post.query.filter_by(user_id=id).order_by(Post.id.desc()).all()

    likes_comp = []
    comment_comp = []
    fin = []

    for post in posts:
        likes = Like.query.filter_by(post_id=post.id).all()
        for like in likes:
            user9 = User.query.filter_by(id=like.user_id).first()
            likes_comp.append(user9.to_dict())

        comments = Comment.query.filter_by(post_id=post.id).all()
        for comment in comments:
            user8 = User.query.filter_by(id=comment.user_id).first()
            comment_comp.append(user8.to_dict())

        fin.append({'post': post.to_dict(), 'likes': likes_comp, 'comments': comment_comp})
        likes_comp = []
        comment_comp = []

    return {'posts': [f for f in fin]}

@post_routes.route('/following')
@login_required
def following_posts():

    following = Follow.query.filter_by(follower_id=current_user.id).all()

    all_posts = []
    likes_comp = []

    complete_comments = []

    complete_comments2 = []
    likes_comp2 = []

    for follow in following:
        posts = Post.query.filter_by(user_id=follow.following_id).all()
        for post in posts:
            user = User.query.get(post.user_id)
            comments = Comment.query.filter_by(post_id=post.id).order_by(Comment.id.desc()).all()
            for comment in comments:
                comment_user = User.query.get(comment.user_id)
                complete_comments.append({'comment': comment.to_dict(), 'user': comment_user.to_dict()})
            likes = Like.query.filter_by(post_id=post.id).all()
            for like in likes:
                user6 = User.query.filter_by(id=like.user_id).first()
                likes_comp.append(user6.to_dict())
            all_posts.append({'post': post.to_dict(), 'user': user.to_dict(), 'comments': complete_comments, 'likes': likes_comp})
            complete_comments = []
            likes_comp = []

    user_posts = Post.query.filter_by(user_id=current_user.id).all()

    for post in user_posts:
        comments2 = Comment.query.filter_by(post_id=post.id).order_by(Comment.id.desc()).all()
        for comment2 in comments2:
            comment_user2 = User.query.get(comment2.user_id)
            complete_comments2.append({'comment': comment2.to_dict(), 'user': comment_user2.to_dict()})
        likes = Like.query.filter_by(post_id=post.id).all()
        for like in likes:
            user5 = User.query.filter_by(id=like.user_id).first()
            likes_comp2.append(user5.to_dict())
        all_posts.append({'post': post.to_dict(), 'user': current_user.to_dict(), 'comments': complete_comments2, 'likes': likes_comp2})
        complete_comments2 = []
        likes_comp2 = []

    sort = sorted(all_posts, key=lambda x:x['post']['id'], reverse=True)

    return {'following': [post for post in sort]}

@post_routes.route('/new', methods=['POST'])
@login_required
def posts_post():

    if "file" not in request.files:
        return "No user_file key in request.files"

    file = request.files['file']

    # data = request.json

    # post = Post(user_id=current_user.id, media_url=data['media_url'], description=data['description'], createdAt=datetime.now())

    if file:
        file_url = upload_file_to_s3(file, Config.S3_BUCKET)
        post = Post(user_id=current_user.id, media_url=file_url, description=request.form.get('description'), createdAt=datetime.now())
        db.session.add(post)
        db.session.commit()

    return {'msg': 'ok'}

@post_routes.route('/<int:post_id>', methods=['DELETE'])
@login_required
def delete_posts(post_id):

    post = Post.query.get(post_id)

    db.session.delete(post)
    db.session.commit()

    return following_posts()

@post_routes.route('/<int:post_id>', methods=['PUT'])
@login_required
def edit_post(post_id):

    data = request.json

    post = Post.query.get(post_id)

    post.description = request.json['description']

    db.session.commit()

    return following_posts()

@post_routes.route('/explore')
@login_required
def get_explore():
    not_following = []
    following = []
    unfollowed_posts = []

    follows = Follow.query.filter_by(follower_id=current_user.id)

    for follow in follows:
        follow_info = User.query.get(follow.following_id)
        following.append(follow_info)

    users = Follow.query.filter(Follow.follower_id!=current_user.id).all()

    for user in users:
        user_info = User.query.get(user.follower_id)
        not_following.append(user_info)

    user_set = set(not_following)
    following_set = set(following)

    user_list = list(user_set - following_set)

    not_following = [user.to_dict() for user in user_list]

    for poster in not_following:
        user_posts = Post.query.filter_by(user_id=poster['id']).all()
        for post in user_posts:
            comments = Comment.query.filter_by(post_id=post.id).order_by(Comment.id.desc()).all()
            likes = Like.query.filter_by(post_id=post.id).all()
            unfollowed_posts.append({'post': post.to_dict(), 'user': poster, 'comments': len(comments), 'likes': len(likes)})

    sorter = sorted(unfollowed_posts, key=lambda x:x['post']['id'], reverse=True)

    return {'explore': [post for post in sorter]}
