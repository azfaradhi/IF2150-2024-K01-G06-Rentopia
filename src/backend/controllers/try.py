from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://rpl:rpl@localhost/rentopia'
db = SQLAlchemy(app)

class Customer(db.Model):
    id_cust = db.Column(db.Integer, primary_key=True)
    name_cust = db.Column(db.String(255))
    phone_cust = db.Column(db.String(50))
    address_cust = db.Column(db.Text)
    additional_info = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(50), nullable=True)

    # Add the saveCustomer method
    def saveCustomer(self):
        db.session.add(self)
        db.session.commit()