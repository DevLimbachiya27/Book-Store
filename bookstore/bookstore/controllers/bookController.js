const Book = require('../models/Book');
const fs = require('fs');
const path = require('path');
const deleteImage = (filename) => {
  if (filename && filename !== 'default-book.png') {
    const imgPath = path.join(__dirname, '../uploads', filename);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }
  }
};
exports.getAllBooks = async (req, res) => {
  try {
    const { search, category, sort } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }
    if (category && category !== 'All') {
      query.category = category;
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    else if (sort === 'price_desc') sortOption = { price: -1 };
    else if (sort === 'title') sortOption = { title: 1 };

    const books = await Book.find(query).sort(sortOption);
    const totalBooks = await Book.countDocuments();
    const totalQuantity = await Book.aggregate([{ $group: { _id: null, total: { $sum: '$quantity' } } }]);
    const categories = ['Fiction', 'Non-Fiction', 'Science', 'Technology', 'Finance', 'History', 'Biography', 'Self-Help', 'Romance', 'Mystery', 'Fantasy', 'Other'];

    res.render('index', {
      books,
      totalBooks,
      totalQuantity: totalQuantity[0]?.total || 0,
      categories,
      currentCategory: category || 'All',
      currentSearch: search || '',
      currentSort: sort || 'newest',
      success: req.query.success || null,
      error: req.query.error || null
    });
  } catch (err) {
    console.error(err);
    res.redirect('/?error=Failed+to+load+books');
  }
};
exports.getAddBook = (req, res) => {
  const categories = ['Fiction', 'Non-Fiction', 'Science', 'Technology', 'Finance', 'History', 'Biography', 'Self-Help', 'Romance', 'Mystery', 'Fantasy', 'Other'];
  res.render('add', { categories, error: null });
};
exports.createBook = async (req, res) => {
  try {
    const { title, author, category, price, quantity, description } = req.body;
    const image = req.file ? req.file.filename : 'default-book.png';

    const book = new Book({ title, author, category, price, quantity, description, image });
    await book.save();

    res.redirect('/books?success=Book+added+successfully!');
  } catch (err) {
    console.error(err);
    const categories = ['Fiction', 'Non-Fiction', 'Science', 'Technology', 'Finance', 'History', 'Biography', 'Self-Help', 'Romance', 'Mystery', 'Fantasy', 'Other'];
    res.render('add', { categories, error: 'Failed to add book. Please check all fields.' });
  }
};
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.redirect('/books?error=Book+not+found');
    res.render('show', { book });
  } catch (err) {
    res.redirect('/books?error=Book+not+found');
  }
};
exports.getEditBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.redirect('/books?error=Book+not+found');
    const categories = ['Fiction', 'Non-Fiction', 'Science', 'Technology', 'Finance', 'History', 'Biography', 'Self-Help', 'Romance', 'Mystery', 'Fantasy', 'Other'];
    res.render('edit', { book, categories, error: null });
  } catch (err) {
    res.redirect('/books?error=Book+not+found');
  }
};
exports.updateBook = async (req, res) => {
  try {
    const { title, author, category, price, quantity, description } = req.body;
    const book = await Book.findById(req.params.id);
    if (!book) return res.redirect('/books?error=Book+not+found');
    if (req.file) {
      deleteImage(book.image);
      book.image = req.file.filename;
    }

    book.title = title;
    book.author = author;
    book.category = category;
    book.price = price;
    book.quantity = quantity;
    book.description = description;

    await book.save();
    res.redirect('/books?success=Book+updated+successfully!');
  } catch (err) {
    console.error(err);
    res.redirect(`/books/${req.params.id}/edit?error=Update+failed`);
  }
};
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.redirect('/books?error=Book+not+found');

    deleteImage(book.image);
    await Book.findByIdAndDelete(req.params.id);

    res.redirect('/books?success=Book+deleted+successfully!');
  } catch (err) {
    console.error(err);
    res.redirect('/books?error=Failed+to+delete+book');
  }
};
