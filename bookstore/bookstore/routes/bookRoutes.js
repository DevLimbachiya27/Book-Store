const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const upload = require('../config/multer');

router.get('/', bookController.getAllBooks);
router.get('/new', bookController.getAddBook);
router.post('/', upload.single('image'), bookController.createBook);
router.get('/:id', bookController.getBook);
router.get('/:id/edit', bookController.getEditBook);
router.put('/:id', upload.single('image'), bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
