// DeleteBookButton.js
import React from "react";
import axios from "axios";

const DeleteBookButton = ({ bookId, onSuccess, onError }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:5000/books/${bookId}`
      );
      if (response.status === 204) {
        console.log("Book deleted successfully");
        onSuccess && onSuccess(bookId); // Pass the bookId to onSuccess for further handling
      }
    } catch (error) {
      console.error("Error deleting the book", error);
      onError && onError(error);
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger btn-sm">
      Delete
    </button>
  );
};

export default DeleteBookButton;
