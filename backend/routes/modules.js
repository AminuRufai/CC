const express = require('express');
const router = express.Router();
const { Module, Content, Quiz } = require('../models');

// Get all modules
router.get('/modules', async (req, res) => {
  try {
    const modules = await Module.findAll({ include: ['contents', 'quizzes'] });
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Get a specific module
router.get('/modules/:id', async (req, res) => {
  try {
    const module = await Module.findByPk(req.params.id, { include: ['contents', 'quizzes'] });
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    res.json(module);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Create a new module
router.post('/modules', async (req, res) => {
  try {
    const { title, description, duration, contentType, courseId } = req.body;
    const newModule = await Module.create({ title, description, duration, contentType, courseId });
    res.json(newModule);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Update a module
router.put('/modules/:id', async (req, res) => {
  try {
    const { title, description, duration, contentType, courseId } = req.body;
    const module = await Module.findByPk(req.params.id);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    await module.update({ title, description, duration, contentType, courseId });
    res.json(module);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Delete a module
router.delete('/modules/:id', async (req, res) => {
  try {
    const module = await Module.findByPk(req.params.id);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    await module.destroy();
    res.json({ message: 'Module deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

module.exports = router;
