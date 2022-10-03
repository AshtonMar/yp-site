from .. import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model, UserMixin):
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    
    password = db.Column(db.String(50))
    
    
    def set_pass(self, password):
        self.password = generate_password_hash(password)
    
    def check_pass(self, password):
        return check_password_hash(self.password, password)
