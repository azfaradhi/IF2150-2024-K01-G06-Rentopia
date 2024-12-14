# import library
from flask import Blueprint, jsonify, request
from datetime import datetime

# import model modul
from page.activity.activity_model import Activity
from page.car.car_model import Car
from page.customer.customer_model import Customer

activity_bp = Blueprint('activity', __name__)

def calculatePrice(data):
    car = Car(id_car=data['id_car'])
    price_car = car.getPriceCar()

    # validasi
    if price_car is None:
        raise ValueError(f"Could not get price for car ID: {data['id_car']}")

    start_date = datetime.strptime(data['date_range'][0], '%Y-%m-%d')
    end_date = datetime.strptime(data['date_range'][1], '%Y-%m-%d')
    num_days = (end_date - start_date).days + 1
    price_total = num_days * int(price_car)

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
        'total_price': activity.getPrice(),
        'status_car': activity.getStatusCar(),
        'status_cust': activity.getIDCustomer(),
        'status_activity': activity.getStatusActivity(),
    })


@activity_bp.route('/api/activity/create', methods=['POST'])
def create_activity():
    data = request.json

    # validasi
    if data is None:
        raise ValueError(f"Could not get price for car ID: {data['id_car']}")
    date_range = [datetime.strptime(date_str, '%Y-%m-%d').date() for date_str in data['date_range']]

    activity = Activity(id_activity=None)
    activity.setIDCustomer(data['id_cust'])
    activity.setIDCar(data['id_car'])
    activity.setDateRange(date_range)
    activity.setTotalPrice(data['total_price'])
    activity.setStatusCar(data['status_car'])
    activity.setStatusCust(data['status_cust'])
    activity.setStatusActivity(data['status_activity'])
    activity.saveActivity()

    car = Car(data['id_car'])
    car.loadCar()
    car.setStatusCar(data['status_car'])
    car.saveCar()

    customer = Customer(data['id_cust'])
    customer.loadCustomer()
    customer.setStatusCustomer(data['status_cust'])
    customer.saveCustomer()
    
    return jsonify({'message': 'Activity created successfully'})


@activity_bp.route('/api/activity/show/<int:id_activity>', methods=['GET'])
def show_activity():
    activity = Activity()
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


@activity_bp.route('/api/report/', methods=['GET'])
def get_report():
    page = int(request.args.get('page', 1))
    items_per_page = int(request.args.get('items_per_page', 2))

    date_range = request.args.get('date_range')

    # split date range
    if date_range:
        date_range = date_range.strip('{}').split(',')
    else:
        return jsonify({'error': 'no data'}), 400

    report_list, total_activities, total_pages = Activity.get_paginated_activity_daterange(page, items_per_page, date_range)

    return jsonify({
        'page': page,
        'items_per_page': items_per_page,
        'total_pages': total_pages,
        'total_activities': total_activities,
        'date_awal': date_range[0],
        'date_akhir': date_range[1],
        'date_range': date_range,
        'report_list': report_list
    })


@activity_bp.route('/api/report/price', methods=['GET'])
def get_total_report():
    date_range = request.args.get('date_range')
    if date_range:
        date_range = date_range.strip('{}').split(',')
    else:
        return jsonify({'error': 'no data'}), 400
    
    total_price = Activity.get_total_price(date_range)

    return jsonify({
        'date_awal': date_range[0],
        'date_akhir': date_range[1],
        'date_range': date_range,
        'total_price': total_price
    })

    
@activity_bp.route('/api/activity/update/<int:id_act>', methods=['POST'])
def update_activity(id_act):
    data = request.json

    # validasi
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    fields = ['id_activity','status_activity','status_car','status_cust']
    for field in fields: 
        if field not in data or data[field] is None or data[field] == '':
            return jsonify({'error': f'Missing required field: {field}'}), 400

    activity = Activity(id_act)
    activity.loadActivity()
    activity.setStatusCar(data['status_car'])
    activity.setStatusCust(data['status_cust'])
    activity.setStatusActivity(data['status_activity'])
    activity.saveActivity()

    return jsonify({'message': 'Car updated successfully'})