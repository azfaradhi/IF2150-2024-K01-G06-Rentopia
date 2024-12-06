from src.backend.page.customer.customer_model import Customer
from flask import Blueprint, jsonify, request

customer_bp = Blueprint('customer', __name__)
    

@customer_bp.route('/api/customer/<int:id_cust>', methods=['GET'])
def get_customer(id_cust):
    customer = Customer(id_cust)
    return jsonify({
        'id_cust': customer.getIDCustomer(),
        'name_cust': customer.getNameCustomer(),
        'phone_cust': customer.getPhoneCustomer(),
        'address_cust': customer.getAddressCustomer(),
        'additional_info_cust': customer.getAdditionalInfoCustomer(),
        'status_cust': customer.getStatusCustomer()
    })

@customer_bp.route('/api/customer', methods=['POST'])
def create_customer():
    data = request.json

    customer = Customer(data['id_cust'])
    customer.id_cust = data['id_cust']
    customer.name_cust = data['name_cust']
    customer.phone_cust = data['phone_cust']
    customer.address_cust = data['address_cust']
    customer.additional_info_cust = data['additional_info_cust']
    customer.status_cust = data['status_cust']
    customer.saveCustomer()
    return jsonify({'message': 'Customer created successfully'})

@customer_bp.route('/api/customer/show/<int:id_activity>', methods=['GET'])
def show_customer(id_cust):
    customer = Customer(id_cust)
    return jsonify({
        'id_cust': customer.id_cust,
        'name_cust': customer.name_cust,
        'phone_cust': customer.phone_cust,
        'address_cust': customer.address_cust,
        'additional_info_cust': customer.additional_info_cust,
        'status_cust': customer.status_cust
    })