import sqlite3
from flask import Flask, request, jsonify

def user_table():
    conn = sqlite3.connect('yp.db')
    print("Opened database successfully")

    conn.execute("CREATE TABLE IF NOT EXISTS user(user_id INTEGER PRIMARY KEY AUTOINCREMENT,"
                 "full_name TEXT NOT NULL,"
                 "user_image VARCHAR,"
                 "birth_date TEXT NOT NULL,"
                 "phone_number INT(10))")
    print("Table Created Successfully")
    conn.close()


def fetch_users():
    with sqlite3.connect('yp.db') as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM user")
        users = cursor.fetchall()

        new_data = []

        for data in users:
            new_data.append(users(data[0], data[3], data[4]))
    return new_data

user_table()
users = fetch_users()


app = Flask(__name__)
app.debug = True


@app.route('/new_user/', methods=["POST"])
def new_user():
    response = {}

    if request.method == "POST":
        full_name = request.json['full_name']
        user_image = request.json['user_image']
        birth_date = request.json['birth_date']
        phone_number = request.json['phone_number']

        with sqlite3.connect("yp.db") as conn:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO user("
                           "full_name,"
                           "user_image,"
                           "birth_date,"
                           "phone_number) VALUES(?, ?, ?, ?)", (full_name, user_image, birth_date, phone_number))
            conn.commit()
            response["message"] = "success"
            response["status_code"] = 201
        return response


@app.route("/delete-user/<int:user_id>")
def delete_post(user_id):
    response = {}
    with sqlite3.connect("yp.db") as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM user WHERE id=" + str(user_id))
        conn.commit()
        response['status_code'] = 200
        response['message'] = "success"
    return response


@app.route('/change_user_info/<int:user_id>/', methods=["PUT"])
def change_user_info(user_id):
    response = {}

    if request.method == "PUT":
        with sqlite3.connect('yp.db') as conn:
            incoming_data = dict(request.json)
            put_data = {}

            if incoming_data.get("full_name") is not None:
                put_data["full_name"] = incoming_data.get("full_name")
                
                with sqlite3.connect('yp.db') as conn:
                    cursor = conn.cursor()
                    cursor.execute("UPDATE user SET full_name =? WHERE id=?", (put_data["full_name"], user_id))
                    conn.commit()
                    response['message'] = "Update was successfully"
                    response['status_code'] = 200
                    
            if incoming_data.get("content") is not None:
                put_data['content'] = incoming_data.get('content')

                with sqlite3.connect('yp.db') as conn:
                    cursor = conn.cursor()
                    cursor.execute("UPDATE post SET content =? WHERE id=?", (put_data["content"], user_id))
                    conn.commit()

                    response["content"] = "Content updated successfully"
                    response["status_code"] = 200
    return response


@app.route('/find_user/<int:user_id>/', methods=["GET"])
def find_user(user_id):
    response = {}

    with sqlite3.connect("yp.db") as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM user WHERE id=" + str(user_id))

        response["status_code"] = 200
        response["description"] = "success"
        response["data"] = cursor.fetchone()

    return jsonify(response)


@app.route('/certain_users/', methods=["GET"])
def get_user():
    response = {}
    with sqlite3.connect("yp.db") as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM user")

        users = cursor.fetchall()

    response['status_code'] = 200
    response['data'] = users
    return response

if __name__ == '__main__':
    app.run()
