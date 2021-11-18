from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post, Follow, User, db, Comment
from datetime import datetime

post_routes = Blueprint('posts', __name__)

@post_routes.route('/<int:id>')
@login_required
def posts(id):
    posts = Post.query.filter_by(user_id=id).order_by(Post.id.desc()).all()

    return {'posts': [post.to_dict() for post in posts]}

@post_routes.route('/following')
@login_required
def following_posts():

    following = Follow.query.filter_by(follower_id=current_user.id).all()

    all_posts = []

    complete_comments = []

    complete_comments2 = []

    for follow in following:
        posts = Post.query.filter_by(user_id=follow.following_id).all()
        for post in posts:
            user = User.query.get(post.user_id)
            comments = Comment.query.filter_by(post_id=post.id).order_by(Comment.id.desc()).all()
            for comment in comments:
                comment_user = User.query.get(comment.user_id)
                complete_comments.append({'comment': comment.to_dict(), 'user': comment_user.to_dict()})
            all_posts.append({'post': post.to_dict(), 'user': user.to_dict(), 'comments': complete_comments})
            complete_comments = []

    user_posts = Post.query.filter_by(user_id=current_user.id).all()

    for post in user_posts:
        comments2 = Comment.query.filter_by(post_id=post.id).order_by(Comment.id.desc()).all()
        for comment2 in comments2:
            comment_user2 = User.query.get(comment2.user_id)
            complete_comments2.append({'comment': comment2.to_dict(), 'user': comment_user2.to_dict()})
        all_posts.append({'post': post.to_dict(), 'user': current_user.to_dict(), 'comments': complete_comments2})
        complete_comments2 = []

    sort = sorted(all_posts, key=lambda x:x['post']['id'], reverse=True)

    return {'following': [post for post in sort]}

@post_routes.route('/new', methods=['POST'])
@login_required
def posts_post():

    data = request.json

    post = Post(user_id=current_user.id, media_url=data['media_url'], description=data['description'], createdAt=datetime.now())
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
