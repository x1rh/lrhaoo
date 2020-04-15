from .. import db
from datetime import datetime


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True, index=True)
    article_id = db.Column(db.Integer, db.ForeignKey('articles.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    content = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    disabled = db.Column(db.Boolean, default=True)

    replies = db.relationship('Reply', backref='comment', lazy='dynamic')
