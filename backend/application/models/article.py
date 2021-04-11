from .. import db
from datetime import datetime
from lxml import etree
from markdown import markdown
from .many_to_many import tag_to_article


class Article(db.Model):
    __tablename__ = 'articles'

    id = db.Column(db.Integer, primary_key=True, index=True)

    title = db.Column(db.String(128))
    content = db.Column(db.Text)
    description = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    count = db.Column(db.Integer, default=0)

    disabled = db.Column(db.Boolean, default=True)
    comment_enable = db.Column(db.Boolean, default=True)

    comments = db.relationship('Comment', backref='article', lazy='dynamic')
    tags = db.relationship('Tag', secondary=tag_to_article, back_populates='articles', lazy='dynamic')

    def __init__(self, **kwargs):
        super(Article, self).__init__(**kwargs)
        self.make_description()

    def make_description(self):
        html = markdown(self.content)
        self.description = etree.HTML(html).xpath('string()')

    def truncate(self, s, length=255, killwords=False, end='...', leeway=5):
        assert length >= len(end), "expected length >= %s, got %s" % (len(end), length)
        assert leeway >= 0, "expected leeway >= 0, got %s" % leeway
        if len(s) <= length + leeway:
            return s
        if killwords:
            return s[: length - len(end)] + end
        result = s[: length - len(end)].rsplit(" ", 1)[0]
        return result + end

    def json(self):
        return {
            'title': self.title,
            'content': self.content,
            'timestamp': self.timestamp,
        }

    def simple_json(self):
        return {
            'title': self.title,
            'articleID': self.id,
            'description': self.truncate(self.description, length=256, killwords=False),
            'timestamp': self.timestamp,
            'tags': [_.json() for _ in self.tags.all()]
        }









