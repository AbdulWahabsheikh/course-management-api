const express = require('express');
const c = require('../controllers/courseController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(c.getCourses).post(protect, c.createCourse);
router.route('/:id').get(c.getCourse).put(protect, c.updateCourse).delete(protect, c.deleteCourse);

module.exports = router;
