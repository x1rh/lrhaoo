from .. import db


class Reply(db.Model):
    __tablename__ = 'replies'

    id = db.Column(db.Integer, primary_key=True, index=True)
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'))
    from_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    to_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    content = db.Column(db.Text)
    disabled = db.Column(db.Boolean, default=False)

