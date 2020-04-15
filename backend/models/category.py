from backend import db


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String(128), unique=True)

    @staticmethod
    def insert_categories():
        categories = ['python', 'flask', '数据结构']
        db.session.add_all([Category(name=x) for x in categories])


