from page.car.car_model import Car
from flask import Blueprint, jsonify, request
import os

car_bp = Blueprint('car', __name__)
    

UPLOAD_FOLDER = '../../img'  
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
    
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
    file = request.files['photo']
    if file.filename == '' or not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file'}), 400

    filename = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filename)

    id_car = request.form.get('id_car')
    model_car = request.form.get('model_car')
    type_car = request.form.get('type_car')
    seat_car = request.form.get('seat_car')
    price_car = request.form.get('price_car')

    if not all([id_car, model_car, type_car, seat_car, price_car]):
        return jsonify({'error': 'Missing data fields'}), 400

    car = Car(id_car)
    car.id_car = id_car
    car.setPhotoCar(file.filename)  
    car.setModelCar(model_car)
    car.setTypeCar(type_car)
    car.setSeatCar(int(seat_car))
    car.setPriceCar(int(price_car))
    car.setStatusCar("available")
    car.saveCar()

    return jsonify({'message': 'Car created successfully'})
    # data = request.json
    # print("Recevied data: ", data)
    # if not data:
    #     return jsonify({'error': 'No data provided'}), 400
    # car = Car(data['id_car'])
    # car.id_car = data['id_car']
    # car.setPhotoCar("photo_car.jpg")
    # # car.photo_car = "photo_car.jpg"
    # car.setModelCar(data['model_car'])
    # car.setTypeCar(data['type_car'])
    # car.setSeatCar(int(data['seat_car']))
    # car.setPriceCar(int(data['price_car']))
    # car.setStatusCar("available")
    # car.saveCar()
    # return jsonify({'message': 'Car created successfully'})

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
    if 'photo' in request.files:
        file = request.files['photo']
        if file.filename and allowed_file(file.filename):
            filename = os.path.join(UPLOAD_FOLDER, file.filename)
            file.save(filename)
        else:
            return jsonify({'error': 'Invalid photo file'}), 400
    else:
        filename = None  # Keep existing photo if no new photo is uploaded

    data = request.form.to_dict()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    required_fields = ['id_car', 'model_car', 'type_car', 'seat_car', 'price_car']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({'error': f'Missing required field: {field}'}), 400

    car = Car(data['id_car'])
    car.loadCar()
    car.setModelCar(data['model_car'])
    car.setTypeCar(data['type_car'])
    car.setSeatCar(int(data['seat_car']))
    car.setPriceCar(int(data['price_car']))

    if filename:
        car.setPhotoCar(file.filename) 

    car.saveCar()
    return jsonify({'message': 'Car updated successfully'})

@car_bp.route('/api/car/delete/<string:id_car>', methods =['POST'])
def delete_cars(id_car):
    car = Car(id_car)
    car.deleteCar()
    return jsonify({'message': 'Car deleted successfully'})

