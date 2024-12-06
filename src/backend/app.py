# ini untuk komunikasi backend dan frontend pake flask
# TODO: routing tiap page yang ada dan dan konek ke dbnya

from flask import Flask, jsonify
# from .page import Activity
from controllers.activity_controller import activity_bp
# from controllers.activity_controller import activity_bp
# from page.activity.activity_model import Activity
# from controllers.activity_controller import *

app = Flask(__name__)

# Register blueprints
app.register_blueprint(activity_bp)

@app.route('/')
def home():
    return jsonify({"message": "Flask server is running!"})


if __name__ == '__main__':
    app.run(debug=True)