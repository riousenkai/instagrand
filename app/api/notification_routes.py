from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Notification, User

notification_routes = Blueprint('notifications', __name__)

@notification_routes.route('/', strict_slashes=False)
@login_required
def get_notifications():

    notifications = Notification.query.filter_by(user_id=current_user.id).order_by(Notification.id.desc()).all()

    return {'notifications': [notification.to_dict() for notification in notifications]}

@notification_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_notifications(id):

    notification = Notification.query.get(id)
    db.session.delete(notification)
    db.session.commit()
    return get_notifications()

@notification_routes.route('/all', methods=['DELETE'])
@login_required
def delete_notifications():

    notifications = Notification.query.filter_by(user_id=current_user.id).all()
    for notification in notifications:
        db.session.delete(notification)
        db.session.commit()
    return get_notifications()

@notification_routes.route('/all')
@login_required
def read_all_notifications():

    notifs = Notification.query.filter_by(user_id=current_user.id).all()
    for notif in notifs:
        notif.read = True
        db.session.commit()

    return {'status': 'ok'}
