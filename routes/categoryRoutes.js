const express = require('express');
const c = require('../controllers/categoryController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(c.getCategories).post(protect, c.createCategory);
router.route('/:id').get(c.getCategory).put(protect, c.updateCategory).delete(protect, c.deleteCategory);

module.exports = router;
