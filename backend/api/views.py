from . import api_blueprint
from flask import jsonify


@api_blueprint.route('/article/<int:_id>', methods=['GET'])
def get_articles(_id):
    return jsonify({
        'content': '2333 * 2333',
        'id': _id
    })
