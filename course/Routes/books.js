const express = require('express');
const router = express.Router();

// In-memory data arrays
const books = [
  {
    isbn: "978-3-16-148410-0",
    title: "The Great Adventure",
    author: "John Doe",
    publishedYear: 2021,
    genre: "Adventure",
    
    price: 19.99
  },
  {
    isbn: "978-0-13-235088-4",
    title: "Learn JavaScript",
    author: "Jane Smith",
   

    publishedYear: 2020,
    genre: "Programming",
    price: 29.99
  }
];

const reviews = [
    {
        isbn: "978-3-16-148410-0",
        username: "john_doe",
        review: "Amazing book! Full of thrilling adventures.",
        rating: 5
      }
    
]; // To store reviews by ISBN and username

// Get all books
router.get('/', (req, res) => {
  res.json(books);
});

// Get book by ISBN
router.get('/isbn/:isbn', (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  res.json(book || { message: 'Book not found' });
});

// Get books by author
router.get('/author/:author', (req, res) => {
  const authorBooks = books.filter(b => b.author === req.params.author);
  res.json(authorBooks);
});

// Get books by title
router.get('/title/:title', (req, res) => {
  const titleBooks = books.filter(b => b.title === req.params.title);
  res.json(titleBooks);
});

// Get reviews by ISBN
router.get('/review/:isbn', (req, res) => {
  const bookReviews = reviews.filter(r => r.isbn === req.params.isbn);
  res.json(bookReviews);
});

module.exports = router;
