# import library
from flask import Flask, jsonify

# import controller modul
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