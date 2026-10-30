const Category = require('../models/Category');
const asyncHandler = require('../middleware/asyncHandler');

// POST /api/categories
exports.createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    res.status(400);
    throw new Error('Category name is required');
  }
  const category = await Category.create({ name, description });
  res.status(201).json({ success: true, message: 'Category created', data: category });
});

// GET /api/categories
exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: categories.length, data: categories });
});

// GET /api/categories/:id
exports.getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  res.status(200).json({ success: true, data: category });
});

// PUT /api/categories/:id
exports.updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  res.status(200).json({ success: true, message: 'Category updated', data: category });
});

// DELETE /api/categories/:id
exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  res.status(200).json({ success: true, message: 'Category deleted' });
});
