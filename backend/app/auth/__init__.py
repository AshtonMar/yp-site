from flask import Blueprint


authbp = Blueprint('authbp', __name__)


from . import auth
