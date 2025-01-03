# import model modul
from page.customer.customer_model import Customer

# import library
from flask import Blueprint, jsonify, request

customer_bp = Blueprint('customer', __name__)


@customer_bp.route('/api/customer/<string:id_cust>', methods=['GET'])
def get_customer(id_cust):
    customer = Customer(id_cust)
    customer.loadCustomer()

    return jsonify({
        'id_cust': customer.getIDCustomer(),
        'name_cust': customer.getNameCustomer(),
        'phone_cust': customer.getPhoneCustomer(),
        'address_cust': customer.getAddressCustomer(),
        'status_cust': customer.getStatusCustomer()
    })


@customer_bp.route('/api/customer/create', methods=['POST'])
def create_customer():
    data = request.json
    
    fields = ['id_cust', 'name_cust', 'phone_cust', 'address_cust']
    
    for field in fields: 
        if not data or field not in data or data[field] is None or data[field] == '':
            return jsonify({'error': f'Missing required field: {field}'}), 400
        
    customer = Customer(data['id_cust'])  
    existing_customers = customer.existCustomer() or []  # Default to an empty list if None

    if (data['id_cust'] in existing_customers):
        return jsonify({'message': f"Customer with ID {data['id_cust']} already exists."})
    else:
        customer.setIDCustomer(data['id_cust'])
        customer.setNameCustomer(data['name_cust'])
        customer.setPhoneCustomer(data['phone_cust'])
        customer.setAddressCustomer(data['address_cust'])
        customer.setStatusCustomer("inactive")
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
        'status_cust': customer.status_cust
    })


@customer_bp.route('/api/customer/alldata', methods=['GET'])
def get_customer_pagination():
    page = int(request.args.get('page', 1))
    items_per_page = int(request.args.get('items_per_page', 10))
    
    customers_list, total_customers, total_pages = Customer.get_paginated_customers(page, items_per_page)
    
    return jsonify({
        'page': page,
        'items_per_page': items_per_page,
        'total_pages': total_pages,
        'total_customers': total_customers,
        'customers': customers_list
    })


@customer_bp.route('/api/customer/delete/<string:id_cust>', methods=['POST'])
def delete_customer(id_cust):
    customer = Customer(id_cust)
    customer.deleteCustomer()

    return jsonify({'message': 'Car deleted successfully'})


@customer_bp.route('/api/customer/update', methods=['POST'])
def update_customer():
    data = request.json

    # validasi
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    fields = ['id_cust', 'name_cust', 'phone_cust', 'address_cust']
    
    for field in fields: 
        if field not in data or data[field] is None or data[field] == '':
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    customer = Customer(data['id_cust'])
    customer.loadCustomer()
    customer.setNameCustomer(data['name_cust'])
    customer.setPhoneCustomer(data['phone_cust'])
    customer.setAddressCustomer(data['address_cust'])
    customer.setStatusCustomer(customer.getStatusCustomer())
    customer.saveCustomer()
    
    return jsonify({'message': 'Customer updated successfully'})


@customer_bp.route('/api/customer/update/status', methods=['POST'])
def update_customer_status():
    data = request.json

    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    fields = ['id_cust','status_cust']
    
    for field in fields: 
        if field not in data or data[field] is None or data[field] == '':
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    customer = Customer(data['id_cust'])
    customer.loadCustomer()
    customer.setStatusCustomer(data['status_cust'])
    customer.saveCustomer()
    
    return jsonify({'message': 'Customer updated successfully'})