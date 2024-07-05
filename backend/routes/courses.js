const express = require('express');
const router = express.Router();
const { Course, Module, Content, Quiz } = require('../models');

// Get all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.findAll({ include: [{ model: Module, as: 'modules', include: ['contents', 'quizzes'] }] });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Get a specific course
router.get('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [{ model: Module, as: 'modules', include: ['contents', 'quizzes'] }]
    });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Create a new course
router.post('/courses', async (req, res) => {
  try {
    const { title, description, duration, level } = req.body;
    const newCourse = await Course.create({ title, description, duration, level });
    res.json(newCourse);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Update a course
router.put('/courses/:id', async (req, res) => {
  try {
    const { title, description, duration, level } = req.body;
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    await course.update({ title, description, duration, level });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Delete a course
router.delete('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    await course.destroy();
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

module.exports = router;
