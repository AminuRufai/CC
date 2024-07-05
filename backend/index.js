const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { User, Course, Module, Content, Quiz } = require('./models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Cosmic Connection API!');
});

// Login route
app.post('/api/login', async (req, res) => {
  console.log('Login request received:', req.body);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Login successful');
    res.json({ message: 'Login successful', token, user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Add a new user
app.post('/api/users', async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });
    res.json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Update user roles
app.put('/api/users/:id/roles', async (req, res) => {
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
    console.log('Error:', error);
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Remove user and archive
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.json({ message: 'User removed successfully' });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Get all courses
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Get a specific course
app.get('/api/courses/:id', async (req, res) => {
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

// Add a new course
app.post('/api/courses', async (req, res) => {
  const { title, description, duration, level } = req.body;

  try {
    const newCourse = await Course.create({
      title,
      description,
      duration,
      level,
    });
    res.json({ message: 'Course created successfully', course: newCourse });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Get all modules
app.get('/api/modules', async (req, res) => {
  try {
    const modules = await Module.findAll();
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Add a new module
app.post('/api/modules', async (req, res) => {
  const { title, description, duration, contentType, courseId } = req.body;

  try {
    const newModule = await Module.create({
      title,
      description,
      duration,
      contentType,
      courseId,
    });
    res.json({ message: 'Module created successfully', module: newModule });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Get all contents
app.get('/api/contents', async (req, res) => {
  try {
    const contents = await Content.findAll();
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Add a new content
app.post('/api/contents', async (req, res) => {
  const { type, url, moduleId } = req.body;

  try {
    const newContent = await Content.create({
      type,
      url,
      moduleId,
    });
    res.json({ message: 'Content created successfully', content: newContent });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Get all quizzes
app.get('/api/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.findAll();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Add a new quiz
app.post('/api/quizzes', async (req, res) => {
  const { question, options, correctAnswer, moduleId } = req.body;

  try {
    const newQuiz = await Quiz.create({
      question,
      options,
      correctAnswer,
      moduleId,
    });
    res.json({ message: 'Quiz created successfully', quiz: newQuiz });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
