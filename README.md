# RESTful API Project

This project is a RESTful API for managing a collection of books. It allows users to perform CRUD operations on book records via a React front-end interface and a Flask back-end service.

## Features

- **Create**: Add new book records to the database.
- **Read**: Retrieve a list of all books or a single book by title, author, genre or price.
- **Update**: Modify the details of an existing book.
- **Delete**: Remove a book record from the database.
- **Search**: Find books based on title, author, genre, or price.

## Front-end

Built with React, the front-end provides a user-friendly interface for interacting with the book records. It includes components for listing books, adding a new book, and updating or deleting existing books.

## Back-end

The back-end is a Flask application with a SQLite database. It defines RESTful routes to handle requests from the front-end and performs the necessary database operations.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm (Node Package Manager)
- Python 3
- pip (Python Package Installer)
- Virtualenv (optional for creating isolated Python environments)

### Installing

A step-by-step series of examples that tell you how to get a development environment running.

#### Setting up the Back-end

1. Clone the repository to your local machine.
2. Navigate to the `python` directory.
3. Create a virtual environment (optional):

   ```sh
   python -m venv book_env
   ```
4. Activate the virtual environment:

    On macOS and Linux:
      ```sh
      source book_env/bin/activate
      ```
    On Windows:
      ```sh
      .\book_env\Scripts\activate
      ```

5. Install the required packages:
  ```sh
  pip install Flask Flask-SQLAlchemy
  ```

6. Start the Flask application:
  ```sh
  python app.py
  ```

The back-end service will start on ```http://127.0.0.1:5000/```.

### Setting up the Front-end

1. Navigate to the root directory of the project.

2. Install the dependencies:
  ```sh
  npm install
  ```

3. Start the React application:
  ```sh
  npm start
  ```

The front-end will start on http://localhost:3000/.

### Built With

React - The web framework used for the front-end.

Flask - The web framework used for the back-end.

SQLite - The database engine.

SQLAlchemy - The ORM used.
