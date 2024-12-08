from page.car.car_model import Car
from flask import Blueprint, jsonify, request

car_bp = Blueprint('car', __name__)
    

@car_bp.route('/api/car/<int:id_car>', methods=['GET'])
def get_car(id_car):
    car = Car(id_car)
    return jsonify({
        'id_car': car.id_car,
        'photo_car': car.getPhotoCar(),
        'model_car': car.getModelCar(),
        'type_car': car.getTypeCar(),
        'seat_car': car.getSeatCar(),
        'price_car': car.getPriceCar(),
        'status_car': car.getStatusCar()
    })

@car_bp.route('/api/car/create', methods=['POST'])
def create_car():
    data = request.json
    print("Recevied data: ", data)
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    car = Car(data['id_car'])
    car.id_car = data['id_car']
    car.setPhotoCar("photo_car.jpg")
    # car.photo_car = "photo_car.jpg"
    car.setModelCar(data['model_car'])
    car.setTypeCar(data['type_car'])
    car.setSeatCar(int(data['seat_car']))
    car.setPriceCar(int(data['price_car']))
    car.setStatusCar("available")
    car.saveCar()
    return jsonify({'message': 'Car created successfully'})

@car_bp.route('/api/car/show/<string:id_car>', methods=['GET'])
def show_car(id_car):
    car = Car(id_car)
    car.loadCar()
    return jsonify({
        'id_car': car.id_car,
        'photo_car': car.getPhotoCar(),
        'model_car': car.getModelCar(),
        'type_car': car.getTypeCar(),
        'seat_car': car.getSeatCar(),
        'price_car': car.getPriceCar(),
        'status_car': car.getStatusCar()
    })

@car_bp.route('/api/car/alldata', methods=['GET'])
def get_cars_pagination():
    page = int(request.args.get('page', 1))
    items_per_page = int(request.args.get('items_per_page', 10))
    
    cars_list, total_cars, total_pages = Car.get_paginated_cars(page, items_per_page)
    
    return jsonify({
        'page': page,
        'items_per_page': items_per_page,
        'total_pages': total_pages,
        'total_cars': total_cars,
        'cars': cars_list
    })

@car_bp.route('/api/car/update', methods=['POST'])
def update_car():
    data = request.json
    print("Recevied data: ", data)
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    fields = ['id_car', 'photo_car', 'model_car', 'type_car', 'seat_car', 'price_car']
    for field in fields: 
        if field not in data or data[field] is None or data[field] == '':
            return jsonify({'error': f'Missing required field: {field}'}), 400

    car = Car(data['id_car'])
    car.id_car = data['id_car']
    car.setPhotoCar("photo_car.jpg")
    car.setModelCar(data['model_car'])
    car.setTypeCar(data['type_car'])
    car.setSeatCar(int(data['seat_car']))
    car.setPriceCar(int(data['price_car']))
    car.saveCar()
    return jsonify({'message': 'Car updated successfully'})