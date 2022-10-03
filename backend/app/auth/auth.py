from .. import lm
from ..model import User, db
from . import authbp
from flask import request
from flask_login import login_user, login_required


@authbp.post('/create_user')
def login():
    
    name = request.json['name']
    password = request.json['password']
    
    user = User(name=name, password=password)
    
    db.session.add(user)
    db.session.commit()
    




@lm.user_loader
def load_user(user_id):
    
    return User.get(user_id)
