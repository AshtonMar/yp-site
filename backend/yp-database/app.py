import sqlite3
from flask_cors import CORS
from flask import Flask, request


def create_yp_table():
    with sqlite3.connect('yp.db') as connection:
        cursor = connection.cursor()
        cursor.execute('CREATE TABLE IF NOT EXISTS yp_profiles(yp_id INTEGER PRIMARY KEY AUTOINCREMENT,'
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
def new_user():
    response = {}

    if request.method == "POST":
        full_name = request.json['full_name']
        profile_image = request.json['profile_image']
        phone_number = request.json['phone_number']
        birthday = request.json['birthday']

        with sqlite3.connect("yp.db") as connection:
            connection.row_factory = create_dict
            cursor = connection.cursor()
            cursor.execute("INSERT INTO yp_profiles("
                           "full_name,"
                           "profile_image,"
                           "phone_number,"
                           "birthday) VALUES(?, ?, ?, ?)", (full_name, profile_image, phone_number, birthday))
            connection.commit()

            response["message"] = "Info Added"
            response["status_code"] = 201

            return response


@app.route('/view_yp_profiles/')
def view_yp_profiles():
    response = {}

    with sqlite3.connect("yp.db") as connection:
        connection.row_factory = create_dict
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM yp_profiles")
        yp_profiles = cursor.fetchall()

        response['status_code'] = 200
        response['yp_data'] = yp_profiles

    return response


@app.route('/fetch_yp_id/<full_name>/', methods=["GET"])
def fetch_yp_id(full_name):
    response = {}

    with sqlite3.connect("yp.db") as connection:
        connection.row_factory = create_dict
        cursor = connection.cursor()
        cursor.execute(
            "SELECT yp_id FROM yp_profiles WHERE full_name=?;", (full_name,))
        connection.commit()
        yp_profiles = cursor.fetchall()

        response['status_code'] = 200
        response['yp_data'] = yp_profiles

    return response


@app.route('/delete_yp_profiles/<int:yp_id>/', methods=["POST"])
def delete_yp_profiles(yp_id):
    response = {}

    with sqlite3.connect("yp.db") as connection:
        connection.row_factory = create_dict
        cursor = connection.cursor()
        cursor.execute("DELETE FROM yp_profiles WHERE yp_id=" + str(yp_id))
        connection.commit()

        response['status_code'] = 200
        response['message'] = "User Info Deleted Successfully."

    return response


@app.route('/edit_yp_profiles/<int:yp_id>/', methods=["PUT"])
def edit_yp_profiles(yp_id):
    response = {}

    if request.method == "PUT":
        with sqlite3.connect('yp.db') as conn:
            incoming_data = dict(request.json)
            put_data = {}

            if incoming_data.get("full_name") is not None:
                put_data["full_name"] = incoming_data.get("full_name")

                with sqlite3.connect('yp.db') as conn:
                    cursor = conn.cursor()
                    cursor.execute(
                        "UPDATE yp_profiles SET full_name =? WHERE yp_id=?", (put_data["full_name"], yp_id))
                    conn.commit()

                    response['message'] = "Update was successfully"
                    response['status_code'] = 200

            if incoming_data.get("profile_image") is not None:
                put_data["profile_image"] = incoming_data.get("profile_image")

                with sqlite3.connect('yp.db') as conn:
                    cursor = conn.cursor()
                    cursor.execute(
                        "UPDATE yp_profiles SET profile_image =? WHERE yp_id=?", (put_data["profile_image"], yp_id))
                    conn.commit()

                    response['message'] = "Update was successfully"
                    response['status_code'] = 200

            if incoming_data.get("phone_number") is not None:
                put_data["phone_number"] = incoming_data.get("phone_number")

                with sqlite3.connect('yp.db') as conn:
                    cursor = conn.cursor()
                    cursor.execute(
                        "UPDATE yp_profiles SET phone_number =? WHERE yp_id=?", (put_data["phone_number"], yp_id))
                    conn.commit()

                    response['message'] = "Update was successfully"
                    response['status_code'] = 200

            if incoming_data.get("birthday") is not None:
                put_data["birthday"] = incoming_data.get("birthday")

                with sqlite3.connect('yp.db') as conn:
                    cursor = conn.cursor()
                    cursor.execute(
                        "UPDATE yp_profiles SET birthday =? WHERE yp_id=?", (put_data["birthday"], yp_id))
                    conn.commit()

                    response['message'] = "Update was successfully"
                    response['status_code'] = 200

    return response


if __name__ == '__main__':
    app.run()
    app.debug = True
