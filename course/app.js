const express = require('express');
const bodyParser = require('body-parser');

const bookRoutes = require('./Routes/books');
const userRoutes = require('./Routes/users');

const app = express();
app.use(bodyParser.json());

app.use('/books', bookRoutes);
app.use('/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
