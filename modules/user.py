__author__ = 'meli'

class User:
    id = None
    name = None
    email = None
    lat = None
    lng = None

    def __init__(self, name, surname):
        self.name = name
        self.surname = surname