from .. import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, index=True)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))

    email = db.Column(db.String(64), nullable=False)
    username = db.Column(db.String(64), nullable=False)
    password_hash = db.Column(db.String(128))
    confirmed = db.Column(db.Boolean, default=False)

    black = db.Column(db.Boolean, default=False)
    evil = db.Column(db.String(128))
    about_me = db.Column(db.Text)
    register_time = db.Column(db.DateTime(), default=datetime.utcnow)
    last_seen = db.Column(db.DateTime(), default=datetime.utcnow)
    avatar_hash = db.Column(db.String(32))

    comments = db.relationship('Comment', backref='user', lazy='dynamic')

    # role

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def to_json(self):
        pass






