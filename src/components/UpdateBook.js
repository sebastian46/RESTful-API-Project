// UpdateBook.js

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    price: "",
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/books/${bookId}`
        );
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching the book", error);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:5000/books/${bookId}`, book);
      navigate("/"); // Redirect to the books list or some confirmation page
    } catch (error) {
      console.error("Error updating the book", error);
    }
  };

  return (
    <div>
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
          />
        </label>
        <label>
          Genre:
          <input
            type="text"
            name="genre"
            value={book.genre}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={book.price}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default UpdateBook;
