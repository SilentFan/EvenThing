__author__ = 'meli'

from flask import Flask
from app import config

app = Flask(__name__, template_folder=config.TEMPLATE_PATH,  static_folder=config.STATIC_PATH)

from app import routes