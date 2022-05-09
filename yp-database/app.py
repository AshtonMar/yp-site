import sqlite3
from flask_cors import CORS
from flask import Flask, request


def create_yp_table():
    with sqlite3.connect('yp.db') as connection:
        cursor = connection.cursor()
        cursor.execute('CREATE TABLE IF NOT EXISTS yp_users(yp_id INTEGER PRIMARY KEY AUTOINCREMENT,'
                       'full_name TEXT NOT NULL,'
                       'profile_image TEXT NOT NULL,'
                       'phone_number TEXT NOT NULL,'
                       'birthday TEXT NOT NULL)')
        print('Table Created')


create_yp_table()


def create_dict(cursor, row):
    dictionary = {}
    for index, column in enumerate(cursor.description):
        dictionary[column[0]] = row[index]
    return dictionary


app = Flask(__name__)
app.debug = True
CORS(app)


@app.route("/new_user/", methods=["POST"])
def add_userinfo():
    response = {}

    if request.method == "POST":
        full_name = request.json['full_name']
        profile_image = request.json['profile_image']
        phone_number = request.json['phone_number']
        birthday = request.json['birthday']

        with sqlite3.connect("yp.db") as connection:
            connection.row_factory = create_dict
            cursor = connection.cursor()
            cursor.execute("INSERT INTO yp_users("
                           "full_name,"
                           "profile_image,"
                           "phone_number,"
                           "birthday) VALUES(?, ?, ?, ?)", (full_name, profile_image, phone_number, birthday))
            connection.commit()

            response["message"] = "Info Added"
            response["status_code"] = 201
            return response


@app.route('/view_profiles/')
def view_profiles():
    response = {}

    with sqlite3.connect("yp.db") as connection:
        connection.row_factory = create_dict
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM yp_users")
        profile_info = cursor.fetchall()

        response['status_code'] = 200
        response['yp_data'] = profile_info

    return response


@app.route('/delete_userinfo/<int:yp_id>/', methods=["POST"])
def delete_post(yp_id):
    response = {}

    with sqlite3.connect("yp.db") as connection:
        connection.row_factory = create_dict
        cursor = connection.cursor()
        cursor.execute("DELETE FROM yp_users WHERE yp_id=" + str(yp_id))
        connection.commit()

        response['status_code'] = 200
        response['message'] = "User Info Deleted Successfully."

    return response


if __name__ == '__main__':
    app.run()
    app.debug = True
