from src.backend.page.notification.notification_model import Notification
from flask import Blueprint, jsonify, request

notification_bp = Blueprint('notification', __name__)

@notification_bp.route('/api/notification/<int:id_notif>', methods=['GET'])
def get_notification(id_notif):
    notification = Notification(id_notif)
    return jsonify({
        'id_notif': notification.id_notif,
        'date_end': notification.date_end,
        'id_acticity': notification.id_activity
    })

@notification_bp.route('/api/notification/show/<int:id_notif>', methods=['GET'])
def show_notification(id_notif):
    notification = Notification(id_notif)
    return jsonify({
        'id_notif': notification.id_notif,
        'date_end': notification.date_end,
        'id_acticity': notification.id_activity
    })
