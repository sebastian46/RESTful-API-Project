# app.py
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///books.db'

db = SQLAlchemy(app)

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=True, nullable=False)
    author = db.Column(db.String(80), nullable=False)
    genre = db.Column(db.String(80))
    price = db.Column(db.Float, nullable=False)

@app.route('/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    return jsonify([book.to_dict() for book in books])

@app.route('/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = Book.query.get(book_id)
    if book is None:
        return jsonify({"error": "Book not found"}), 404
    return jsonify(book.to_dict())

@app.route('/books/search', methods=['GET'])
def search_books():
    # Retrieve query parameters
    title_query = request.args.get('title', '')
    author_query = request.args.get('author', '')
    genre_query = request.args.get('genre', '')
    price_query = request.args.get('price', '')

    # Build a query based on the provided parameters
    query = Book.query
    if title_query:
        query = query.filter(Book.title.ilike(f'%{title_query}%'))
    if author_query:
        query = query.filter(Book.author.ilike(f'%{author_query}%'))
    if genre_query:
        query = query.filter(Book.genre.ilike(f'%{genre_query}%'))
    if price_query:
        try:
            price = float(price_query)
            query = query.filter(Book.price == price)
        except ValueError:
            # Handle the exception if the price query is not a valid float
            pass

    # Execute the query and return results
    books = query.all()
    books_data = [book.to_dict() for book in books]
    return jsonify(books_data)

@app.route('/books', methods=['POST'])
def add_book():
    data = request.json
    new_book = Book(title=data['title'], author=data['author'], genre=data['genre'], price=data['price'])
    db.session.add(new_book)
    db.session.commit()
    return jsonify(new_book.to_dict()), 201

@app.route('/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    book = Book.query.get(book_id)
    if book is None:
        return jsonify({"error": "Book not found"}), 404
    data = request.json
    book.title = data['title']
    book.author = data['author']
    book.genre = data['genre']
    book.price = data['price']
    db.session.commit()
    return jsonify(book.to_dict())

@app.route('/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    book = Book.query.get(book_id)
    if book is None:
        return jsonify({"error": "Book not found"}), 404
    db.session.delete(book)
    db.session.commit()
    return jsonify({"message": "Book deleted successfully"}), 204

@app.route('/')
def index():
    return "Welcome to the Book API!"

# Convert the Book model to a dictionary so it can be sent as a json response
def book_to_dict(book):
    return {
        "id": book.id,
        "title": book.title,
        "author": book.author,
        "genre": book.genre,
        "price": book.price
    }

Book.to_dict = book_to_dict

if __name__ == '__main__':
    app.run(debug=True)
