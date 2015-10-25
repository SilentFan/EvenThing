from app import app
from flask import render_template
from modules import user
from flask import request
from flask import redirect, flash, url_for
from modules import registration

__author__ = 'meli'


@app.route("/")
def login():
    return render_template('index.html')


@app.route('/register', methods=['GET', 'POST'])
def register():
    form = registration.RegistrationForm(request.form)
    if request.method == 'POST' and form.validate():
        u = user.User(form.username, form.email,
                      form.password)
        flash('Thanks for registering')
        return redirect(url_for('login'))
    return render_template('register.html', form=form)

app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'








