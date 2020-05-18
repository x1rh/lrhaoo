from .. import db
from .many_to_many import tag_to_article


class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String(128), unique=True)

    articles = db.relationship('Article', secondary=tag_to_article, back_populates='tags', lazy='dynamic')

    @staticmethod
    def insert_tags():
        tags = ['python', 'flask', '数据结构', '算法', 'c++']
        db.session.add_all([Tag(name=_) for _ in tags])

    def json(self):
        return {
            'tagID': self.id,
            'tagName': self.name
        }



