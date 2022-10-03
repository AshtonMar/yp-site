from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
import sqlalchemy


db = SQLAlchemy()
lm = LoginManager()

def create_app():

    app = Flask(__name__)
    
    app.config['SECRET_KEY'] = 'my secret'
    
    app.config['SQLALCHEMY_DATABASE_URL'] = 'sqlite:///db/mydb.db'
    
    db.init_app(app)
    lm.init_app(app)

    with app.app_context():
        
        
        from .auth import auth
        
        app.register_blueprint(auth.authbp)
        
        
        db.create_all()
        return app
