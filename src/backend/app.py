# import library
from flask import Flask, jsonify
from _utils.database_setup import DatabaseSetup

# import controller modul
DB_USER = 'rpl'
DB_PASS = 'rpl'
DB_HOST = '127.0.0.1'
DB_NAME = 'rentopia'
DB_PORT = "5432"

setup = DatabaseSetup(DB_HOST,DB_NAME,DB_USER, DB_PASS, DB_PORT)
setup.setup_database()

from controllers.activity_controller import activity_bp
from controllers.car_controller import car_bp
from controllers.customer_controller import customer_bp


app = Flask(__name__)

# Register blueprints
app.register_blueprint(activity_bp)
app.register_blueprint(car_bp)
app.register_blueprint(customer_bp)

@app.route('/')
def home():
    return jsonify({"message": "Flask server is running!"})


if __name__ == '__main__':
    app.run(debug=True)