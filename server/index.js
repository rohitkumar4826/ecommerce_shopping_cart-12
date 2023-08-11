require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const EmployeeModel = require("./models/Employee");
const Message = require('./models/Message');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { body, validationResult } = require("express-validator"); 
const port=process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/employee")
  .then(() => {
    console.log('Database connected');
  })
  .catch(error => {
    console.error('Database connection error:', error);
  });

app.post('/signup', async (req, res) => {
  const { email, password, cpassword } = req.body;

  // Check if password and cpassword match
  if (password !== cpassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Check if user with the same email already exists
    const existingUser = await EmployeeModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create employee data with hashed password
    const newEmployee = new EmployeeModel({ email, password: hashedPassword });
    const savedEmployee = await newEmployee.save();
// Generating JWT token for signup page
    const token = jwt.sign({ userId: savedEmployee._id }, process.env.SECRET_KEY , { expiresIn: '1h' });

    res.json({ message: 'Signup successful', token });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user with the provided email exists
      const user = await EmployeeModel.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

      res.json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json(error);
    }
  });

  // Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log(token);
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify the token using your secret key
      req.user = decoded;
      next();
    } catch (error) {
     //   console.log('inside error middleware',error);
      res.status(401).json({ error: 'Authentication failed' });
    }
  };

// Protected Route
app.post('/contact', authMiddleware,
[
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('message').notEmpty().withMessage('Message is required'),
  ],
async (req, res) => {
    console.log('inside contact');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userId } = req.user;
    const { name, email, message } = req.body;
  
    try {
      // Create a new message with the user's ID
      const newMessage = new Message({
        userId,
        name,
        email,
        message,
      });
  
      // Save the message to the database
      const savedMessage = await newMessage.save();
  
      res.json({ success: true, message: 'Message sent successfully', savedMessage });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send message' });
    }
  });
  

app.listen(port, () => {
  console.log("Server is running");
});
