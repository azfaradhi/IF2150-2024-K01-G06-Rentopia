# controllers/activity_controller.py
from src.backend.page.activity.activity_model import Activity
from src.backend.page.car.car_model import Car
from flask import Blueprint, jsonify, request
from datetime import datetime

activity_bp = Blueprint('activity', __name__)

def calculatePrice(data):
    car = Car(id_car=data['id_car'])
    price_car = car.getPriceCar()
    start_date = datetime.strptime(data['date_range'][0], '%Y-%m-%d')
    end_date = datetime.strptime(data['date_range'][1], '%Y-%m-%d')
    num_days = (end_date - start_date).days + 1
    
    price_total = num_days * price_car
    return price_total
    

@activity_bp.route('/api/activity/<int:id_activity>', methods=['GET'])
def get_activity(id_activity):
    activity = Activity(id_activity)
    return jsonify({
        'id_activity': activity.id_activity,
        'id_cust': activity.id_cust,
        'id_car': activity.id_car,
        'date_range': activity.date_range,
        'total_price': activity.total_price,
        'status_car': activity.status_car,
        'status_cust': activity.status_cust,
        'status_activity': activity.status_activity,
        'additional_info_activity': activity.additional_info_activity
    })

@activity_bp.route('/api/activity', methods=['POST'])
def create_activity():
    data = request.json
    
    price_total = calculatePrice(data)
       
    activity = Activity(data['id_activity'])
    activity.id_cust = data['id_cust']
    activity.id_car = data['id_car']
    activity.date_range = data['date_range']
    activity.total_price = price_total
    activity.status_car = data['status_car']
    activity.status_cust = data['status_cust']
    activity.status_activity = data['status_activity']
    activity.additional_info_activity = data['additional_info_activity']
    activity.saveActivity()
    return jsonify({'message': 'Activity created successfully'})

@activity_bp.route('/api/activity/show/<int:id_activity>', methods=['GET'])
def show_activity(id_activity):
    activity = Activity(id_activity)
    return jsonify({
        'id_activity': activity.id_activity,
        'id_cust': activity.id_cust,
        'id_car': activity.id_car,
        'date_range': activity.date_range,
        'total_price': activity.total_price,
        'status_car': activity.status_car,
        'status_cust': activity.status_cust,
        'status_activity': activity.status_activity,
        'additional_info_activity': activity.additional_info_activity
    })