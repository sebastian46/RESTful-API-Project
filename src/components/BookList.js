// src/components/BookList.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DeleteBookButton from "./buttons/DeleteBookButton";

function BookList({ books, shouldFetch }) {
  // const [books, setBooks] = useState([]);
  const [internalBooks, setInternalBooks] = useState([]);

  useEffect(() => {
    if (shouldFetch) {
      axios.get("http://127.0.0.1:5000/books").then((response) => {
        setInternalBooks(response.data);
      });
    }
  }, [shouldFetch]);

  const finalBooks = shouldFetch ? internalBooks : books;

  return (
    <div className="container mt-4">
      <h2>Book List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {finalBooks.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>${book.price.toFixed(2)}</td>
              <td>
                <Link
                  to={`/update/${book.id}`}
                  className="btn btn-primary btn-sm"
                >
                  Edit
                </Link>
              </td>
              <td>
                <DeleteBookButton
                  bookId={book.id}
                  onSuccess={(deletedBookId) => {
                    // Filter out the deleted book
                    setInternalBooks((currentBooks) =>
                      currentBooks.filter((book) => book.id !== deletedBookId)
                    );
                  }}
                  onError={(error) => {
                    alert("Failed to delete book. Please try again.");
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

BookList.defaultProps = {
  shouldFetch: true, // Default to fetching books
};

export default BookList;
