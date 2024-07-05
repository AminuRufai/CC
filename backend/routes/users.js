const express = require('express');
const router = express.Router();
const { User, PreviousEmployee } = require('../models');

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Add a new user
router.post('/users', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role
    });
    res.json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Update user role
router.put('/users/:id/role', async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.role = role;
    await user.save();
    res.json({ message: 'User role updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Remove user and archive
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await PreviousEmployee.create({
      email: user.email,
      role: user.role,
      removedAt: new Date()
    });
    await user.destroy();
    res.json({ message: 'User removed and archived successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Get all previous employees
router.get('/previous-employees', async (req, res) => {
  try {
    const previousEmployees = await PreviousEmployee.findAll();
    res.json(previousEmployees);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

module.exports = router;
