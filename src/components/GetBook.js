import React, { useState } from "react";
import axios from "axios";
import BookList from "./BookList"; // Import the BookList component
import FormField from "./FormField";

const GetBook = () => {
  const [search, setSearch] = useState({
    title: "",
    author: "",
    genre: "",
    price: "",
  });
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearched(true);
    const queryParams = new URLSearchParams(search).toString();

    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/books/search?${queryParams}`
      );
      setBooks(response.data);
      setError("");
    } catch (error) {
      console.error("There was an error fetching the books:", error);
      setError(error.response?.data?.error || "Failed to fetch books.");
    }
  };

  return (
    <div>
      <h2>Get Book</h2>
      <div className="col-md-4 mb-4 m-auto">
        <form onSubmit={handleSubmit}>
          <FormField
            label="Title"
            type="text"
            name="title"
            value={search.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <FormField
            label="Author"
            type="text"
            name="author"
            value={search.author}
            onChange={handleChange}
            placeholder="Author"
          />
          <FormField
            label="Genre"
            type="text"
            name="genre"
            value={search.genre}
            onChange={handleChange}
            placeholder="Genre"
          />
          <FormField
            label="Price"
            type="text"
            name="price"
            value={search.price}
            onChange={handleChange}
            placeholder="Price"
          />

          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </div>
      {error && <p>{error}</p>}
      {searched &&
        (books.length > 0 ? (
          <BookList books={books} shouldFetch={false} />
        ) : (
          <p>No books found.</p>
        ))}
    </div>
  );
};

export default GetBook;
