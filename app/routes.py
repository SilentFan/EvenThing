__author__ = 'meli'

from app import app
from flask import render_template
from modules import user

@app.route("/")
def hello():
    u = user.User("New", "User")
<<<<<<< HEAD
    return render_template("index.html", name=u.surname)
=======
    return render_template('index.html', name=u.surname)
>>>>>>> master

