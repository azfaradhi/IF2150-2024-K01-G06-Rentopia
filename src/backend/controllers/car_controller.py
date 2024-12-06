from src.backend.page.car.car_model import Car
from flask import Blueprint, jsonify, request

car_bp = Blueprint('car', __name__)
    

@car_bp.route('/api/car/<int:id_car>', methods=['GET'])
def get_car(id_car):
    car = Car(id_car)
    return jsonify({
        'id_car': car.id_car,
        'photo_car': car.photo_car,
        'model_car': car.model_car,
        'type_car': car.type_car,
        'seat_car': car.seat_car,
        'price_car': car.price_car,
        'status_car': car.status_car
    })

@car_bp.route('/api/car', methods=['POST'])
def create_car():
    data = request.json

    car = car(data['id_car'])
    car.id_car = data['id_car']
    car.photo_car = data['photo_car']
    car.model_car = data['model_car']
    car.type_car = data['type_car']
    car.seat_car = data['seat_car']
    car.price_car = data['price_car']
    car.status_car = data['status_car']
    car.saveCar()
    return jsonify({'message': 'Car created successfully'})

@car_bp.route('/api/car/show/<int:id_activity>', methods=['GET'])
def show_car(id_car):
    car = Car(id_car)
    return jsonify({
        'id_car': car.id_car,
        'photo_car': car.photo_car,
        'model_car': car.model_car,
        'type_car': car.type_car,
        'seat_car': car.seat_car,
        'price_car': car.price_car,
        'status_car': car.status_car
    })