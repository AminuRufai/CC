const express = require('express');
const router = express.Router();
const { Course, Module, Content, Quiz } = require('../models');

// Get all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Get a specific course
router.get('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [{ model: Module, as: 'modules', include: [{ model: Content, as: 'contents' }, { model: Quiz, as: 'quizzes' }] }]
    });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

module.exports = router;
