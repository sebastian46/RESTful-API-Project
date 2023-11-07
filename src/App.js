// src/App.js

// import React from "react";
// import "./App.css";
// import BookList from "./components/BookList";
// import AddBook from "./components/AddBook";
// import GetBook from "./components/GetBook";

// function App() {
//   return (
//     <div className="App">
//       <h1>Book Management</h1>
//       <AddBook />
//       <BookList />
//       <GetBook />
//     </div>
//   );
// }

// export default App;
// src/App.js

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import GetBook from "./components/GetBook";
import UpdateBook from "./components/UpdateBook";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Book Management</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add-book">Add Book</Link>
            </li>
            <li>
              <Link to="/get-book">Search Book</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/get-book" element={<GetBook />} />
          <Route path="/update/:bookId" element={<UpdateBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
