from flask import Flask, request, jsonify
from flask_cors import CORS
from pony.orm import *
import pymysql
import os
import time

pymysql.install_as_MySQLdb()

app = Flask(__name__)
CORS(app)

db = Database()

class Movie(db.Entity):
    title        = Required(str)
    genre        = Optional(str)
    year         = Optional(int)
    planned_date = Optional(str)
    status       = Optional(str)

time.sleep(10)

db.bind(
    provider='mysql',
    host=os.environ.get('DB_HOST', 'localhost'),
    user=os.environ.get('DB_USER', 'root'),
    passwd=os.environ.get('DB_PASS', ''),
    db=os.environ.get('DB_NAME', 'movieapp')
)
db.generate_mapping(create_tables=True)


@app.route('/movies', methods=['GET'])
@db_session
def get_movies():
    movies = select(m for m in Movie)[:]
    return jsonify([{
        'id': m.id, 'title': m.title, 'genre': m.genre,
        'year': m.year, 'planned_date': m.planned_date, 'status': m.status
    } for m in movies])

@app.route('/movies', methods=['POST'])
@db_session
def create_movie():
    data = request.json
    m = Movie(
        title=data.get('title',''),
        genre=data.get('genre',''),
        year=int(data.get('year') or 0),
        planned_date=data.get('planned_date',''),
        status=data.get('status','')
    )
    return jsonify({'id': m.id}), 201

@app.route('/movies/<int:movie_id>', methods=['PUT'])
@db_session
def update_movie(movie_id):
    data = request.json
    m = Movie[movie_id]
    m.title        = data.get('title', m.title)
    m.genre        = data.get('genre', m.genre)
    m.year         = int(data.get('year') or m.year)
    m.planned_date = data.get('planned_date', m.planned_date)
    m.status       = data.get('status', m.status)
    return jsonify({'success': True})

@app.route('/movies/<int:movie_id>', methods=['DELETE'])
@db_session
def delete_movie(movie_id):
    Movie[movie_id].delete()
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)