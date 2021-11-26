from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Notification

notification_routes = Blueprint('notifications', __name__)

@notification_routes.route('/')
# @login_required
def get_notifications():

    notifications = Notification.query.filter_by(user_id=current_user.id)

    return {'notifications': [notification.to_dict() for notification in notifications]}
