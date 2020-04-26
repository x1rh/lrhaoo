from .. import db


class Permission:
    VISITOR = 0x01
    USER = 0x02
    ADMIN = 0x04


class Role(db.Model):
    __tablename__ = 'roles'

    id = db.Column(db.Integer, primary_key=True)
    role_name = db.Column(db.String(32))
    permissions = db.Column(db.Integer)

    users = db.relationship('User', backref='role')

    def __repr__(self):
        return '<Role {role_name}>'.format(role_name=self.role_name)

    @staticmethod
    def insert_roles():
        roles = {
            'Visitor': Permission.VISITOR,
            'User': Permission.USER,
            'Admin': Permission.ADMIN
        }

        db.session.add_all([Role(role_name=k, permissions=v) for k, v in roles.items()])




