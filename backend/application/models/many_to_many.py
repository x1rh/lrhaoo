from .. import db

tag_to_article = db.Table(
    'tag_to_article',
    db.Column('tag_id', db.Integer, db.ForeignKey('tags.id')),
    db.Column('article_id', db.Integer, db.ForeignKey('articles.id'))
)
