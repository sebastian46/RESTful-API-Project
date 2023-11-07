// src/components/AddBook.js

import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import FormField from "./FormField";

function AddBook() {
  const initialBookForm = {
    id: uuidv4(),
    title: "",
    author: "",
    genre: "",
    price: "",
  };

  const [bookForms, setBookForms] = useState([initialBookForm]);

  const handleInputChange = (id, event) => {
    const newBookForms = bookForms.map((bookForm) => {
      if (bookForm.id === id) {
        return { ...bookForm, [event.target.name]: event.target.value };
      }
      return bookForm;
    });
    setBookForms(newBookForms);
  };

  const handleAddForm = () => {
    if (bookForms.length < 16) {
      setBookForms([...bookForms, { ...initialBookForm, id: uuidv4() }]);
    }
  };

  const handleRemoveForm = (id) => {
    setBookForms(bookForms.filter((bookForm) => bookForm.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    bookForms.forEach((bookForm) => {
      const { title, author, genre, price } = bookForm;
      axios
        .post("http://127.0.0.1:5000/books", {
          title,
          author,
          genre,
          price: parseFloat(price) || 0,
        })
        .then(() => {
          // Optionally do something with each response
        });
    });

    // Reset the forms after submitting
    setBookForms([initialBookForm]);
  };

  return (
    <div className="container mt-4">
      <h2>Add Book</h2>
      <div className="row">
        {bookForms.map((bookForm, index) => (
          <div key={bookForm.id} className="col-md-4 mb-4">
            <form onSubmit={handleSubmit} className="mb-3">
              <FormField
                type="text"
                className="form-control"
                placeholder="Title"
                name="title"
                value={bookForm.title}
                onChange={(event) => handleInputChange(bookForm.id, event)}
              />
              <FormField
                type="text"
                className="form-control"
                placeholder="Author"
                name="author"
                value={bookForm.author}
                onChange={(event) => handleInputChange(bookForm.id, event)}
              />
              <FormField
                type="text"
                className="form-control"
                placeholder="Genre"
                name="genre"
                value={bookForm.genre}
                onChange={(event) => handleInputChange(bookForm.id, event)}
              />
              <FormField
                type="number"
                className="form-control"
                placeholder="Price"
                name="price"
                value={bookForm.price}
                onChange={(event) => handleInputChange(bookForm.id, event)}
              />
              {bookForms.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveForm(bookForm.id)}
                >
                  Remove
                </button>
              )}
              {index === bookForms.length - 1 && (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleAddForm}
                  disabled={bookForms.length === 16}
                >
                  Add Another Book
                </button>
              )}
            </form>
          </div>
        ))}
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Submit All Books
      </button>
    </div>
  );
}

export default AddBook;
