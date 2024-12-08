# controllers/activity_controller.py
from page.activity.activity_model import Activity
from page.car.car_model import Car
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
    activity.loadActivity()
    return jsonify({
        'id_activity': activity.getIDActivity(),
        'id_cust': activity.getIDCustomer(),
        'id_car': activity.getIDCar(),
        'date_range': activity.getDateRange(),
        'total_price': activity.getIDCustomer(),
        'status_car': activity.getIDCustomer(),
        'status_cust': activity.getIDCustomer(),
        'status_activity': activity.getIDCustomer(),
        'additional_info_activity': activity.getIDCustomer()
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
    activity.loadActivity()
    return jsonify({
        'id_activity': activity.id_activity,
        'id_cust': activity.getIDCustomer(),
        'id_car': activity.getIDCar(),
        'date_range': activity.getDateRange(),
        'total_price': activity.getPrice(),
        'status_car': activity.getStatusCar(),
        'status_cust': activity.getStatusCust(),
        'status_activity': activity.getStatusActivity(),
        'additional_info_activity': activity.getAdditionalInfo()
    })

@activity_bp.route('/api/activity/alldata', methods=['GET'])
def get_activity_pagination():
    page = int(request.args.get('page', 1))
    items_per_page = int(request.args.get('items_per_page', 10))
    
    activities, total_activities, total_pages = Activity.get_paginated_activities(page, items_per_page)
    
    return jsonify({
        'page': page,
        'items_per_page': items_per_page,
        'total_pages': total_pages,
        'total_activities': total_activities,
        'activities': activities
    })
