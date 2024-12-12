import requests

url = 'http://localhost:5000/api/customer/create'
data = {
    "id_cust": 1,
    "name_cust": "Najwa Kahani",
    "phone_cust": "0866",
    "address_cust": "Jatim",
    "additional_info": "VIPcustomer",
    "status": "active"
}

response = requests.post(url, json=data)

print("Status Code:", response.status_code)
print("Response JSON:", response.json())