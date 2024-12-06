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

@car_bp.route('/api/car', methods=['POST'])
def create_car():
    data = request.json

    car = Car(data['id_car'])
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
        'photo_car': car.getPhotoCar(),
        'model_car': car.getModelCar(),
        'type_car': car.getTypeCar(),
        'seat_car': car.getSeatCar(),
        'price_car': car.getPriceCar(),
        'status_car': car.getStatusCar()
    })