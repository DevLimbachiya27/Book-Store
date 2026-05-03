const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');

const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/bookstoreDB')
  .then(() => console.log(' MongoDB Connected Successfully'))
  .catch(err => console.log(' MongoDB Connection Error:', err));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/books', bookRoutes);
app.get('/', (req, res) => {
  res.redirect('/books');
});
app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
