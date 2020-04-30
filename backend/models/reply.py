from .. import db


class Reply(db.Model):
    __tablename__ = 'replies'

    id = db.Column(db.Integer, primary_key=True, index=True)
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'))
    from_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    to_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    content = db.Column(db.Text)
    disabled = db.Column(db.Boolean, default=False)
    likes = db.Column(db.Integer, default=0)

    from_user = db.relationship('User', foreign_keys=[from_id], backref='reply_from')
    to_user = db.relationship('User', foreign_keys=[to_id], backref='reply_to')

    # 通过relationship() backref隐式定义的字段:
    # comment

    def json(self):
        return {
            'fromUser': self.from_user.json(),
            'toUser': self.to_user.json(),
            'content': self.content
        }

