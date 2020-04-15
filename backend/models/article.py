from .. import db
from datetime import datetime


class Article(db.Model):
    __tablename__ = 'articles'

    id = db.Column(db.Integer, primary_key=True, index=True)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))

    title = db.Column(db.String(128))
    content = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    count = db.Column(db.Integer, default=0)

    disabled = db.Column(db.Boolean, default=True)
    comment_enable = db.Column(db.Boolean, default=True)

    comments = db.relationship('Comment', backref='article', lazy='dynamic')

    def to_json(self):
        pass









