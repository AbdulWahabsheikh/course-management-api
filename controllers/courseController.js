const Course = require('../models/Course');
const Category = require('../models/Category');
const asyncHandler = require('../middleware/asyncHandler');

// POST /api/courses
exports.createCourse = asyncHandler(async (req, res) => {
  const { title, price, category } = req.body;
  if (!title || price === undefined || !category) {
    res.status(400);
    throw new Error('Title, price and category are required');
  }

  const categoryExists = await Category.findById(category);
  if (!categoryExists) {
    res.status(404);
    throw new Error('Category not found');
  }

  const course = await Course.create(req.body);
  res.status(201).json({ success: true, message: 'Course created', data: course });
});

// GET /api/courses
exports.getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find().populate('category', 'name').sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: courses.length, data: courses });
});

// GET /api/courses/:id
exports.getCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id).populate('category', 'name');
  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }
  res.status(200).json({ success: true, data: course });
});

// PUT /api/courses/:id
exports.updateCourse = asyncHandler(async (req, res) => {
  if (req.body.category) {
    const categoryExists = await Category.findById(req.body.category);
    if (!categoryExists) {
      res.status(404);
      throw new Error('Category not found');
    }
  }
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }
  res.status(200).json({ success: true, message: 'Course updated', data: course });
});

// DELETE /api/courses/:id
exports.deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }
  res.status(200).json({ success: true, message: 'Course deleted' });
});
