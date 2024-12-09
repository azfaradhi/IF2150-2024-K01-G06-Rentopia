from page.customer.customer_model import Customer
from flask import Blueprint, jsonify, request

customer_bp = Blueprint('customer', __name__)
    

@customer_bp.route('/api/customer/<int:id_cust>', methods=['GET'])
def get_customer(id_cust):
    customer = Customer(id_cust)
    customer.loadCustomer()
    return jsonify({
        'id_cust': customer.getIDCustomer(),
        'name_cust': customer.getNameCustomer(),
        'phone_cust': customer.getPhoneCustomer(),
        'address_cust': customer.getAddressCustomer(),
        'additional_info_cust': customer.getAdditionalInfoCustomer(),
        'status_cust': customer.getStatusCustomer()
    })

@customer_bp.route('/api/customer/create', methods=['POST'])
def create_customer():
    data = request.json
    print("Recevied data: ", data)
    
    fields = ['id_cust', 'name_cust', 'phone_cust', 'address_cust']
    
    for field in fields: 
        print("cek")
        if not data or field not in data or data[field] is None or data[field] == '':
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    customer = Customer(data['id_cust'])
    customer.setIDCustomer(int(data['id_cust']))
    customer.setNameCustomer(data['name_cust'])
    customer.setPhoneCustomer(data['phone_cust'])
    customer.setAddressCustomer(data['address_cust'])
    customer.setAdditionalInfoCustomer("")
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
        'additional_info_cust': customer.additional_info_cust,
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

@customer_bp.route('/api/customer/delete/<int:id_cust>', methods=['POST'])
def delete_customer(id_cust):
    customer = Customer(id_cust)
    customer.deleteCustomer()
    return jsonify({'message': 'Car deleted successfully'})
    
@customer_bp.route('/api/customer/update', methods=['POST'])
def update_customer():
    data = request.json
    print("Recevied data: ", data)
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    fields = ['id_cust', 'name_cust', 'phone_cust', 'address_cust']
    
    for field in fields: 
        if field not in data or data[field] is None or data[field] == '':
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    customer = Customer(data['id_cust'])
    customer.setIDCustomer(int(data['id_cust']))
    customer.setNameCustomer(data['name_cust'])
    customer.setPhoneCustomer(data['phone_cust'])
    customer.setAddressCustomer(data['address_cust'])
    customer.setAdditionalInfoCustomer("")
    customer.setStatusCustomer("inactive")
    customer.saveCustomer()
    return jsonify({'message': 'Customer updated successfully'})
