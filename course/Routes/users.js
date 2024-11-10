const express = require('express');
const router = express.Router();

// Sample in-memory data arrays
const users = [{ username: "john_doe", password: "password123" }];
let currentUser = null; // Simulate "logged-in" user
const reviews = [];

// Login user
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    currentUser = user;
    res.json({ message: 'Logged in successfully' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Add or modify a review
router.post('/review/:isbn', (req, res) => {
  if (!currentUser) {
    return res.status(401).json({ message: 'Login required' });
  }
  const { isbn } = req.params;
  const { review, rating } = req.body;

  // Check if user has already reviewed this book
  const existingReview = reviews.find(r => r.isbn === isbn && r.username === currentUser.username);
  if (existingReview) {
    existingReview.review = review;
    existingReview.rating = rating;
  } else {
    reviews.push({ isbn, username: currentUser.username, review, rating });
  }
  res.json({ message: 'Review added/modified successfully' });
});
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }
    users.push({ username, password });
    res.json({ message: 'User registered successfully' });
  });

// Delete a review
router.delete('/review/:isbn', (req, res) => {
  if (!currentUser) {
    return res.status(401).json({ message: 'Login required' });
  }
  const { isbn } = req.params;
  const index = reviews.findIndex(r => r.isbn === isbn && r.username === currentUser.username);
  if (index !== -1) {
    reviews.splice(index, 1);
    res.json({ message: 'Review deleted successfully' });
  } else {
    res.status(404).json({ message: 'No review found for this book' });
  }
});

module.exports = router;
