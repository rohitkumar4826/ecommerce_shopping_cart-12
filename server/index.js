require("dotenv").config();
const express = require("express");
const Razorpay = require('razorpay');
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
app.use(express.static(__dirname+"/build"));
mongoose.connect(process.env.MONGO_LINK)
  .then(() => {
    console.log('Database connected');
  })
  .catch(error => {
    console.error('Database connection error:', error);
  });
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

  app.post('/create-order', async (req, res) => {
    const { amount } = req.body; // Amount in paise (e.g., 1000 paise = ₹10)
  
    const options = {
      amount, // Amount in paise
      currency: 'INR',
    };
  
    try {
      const order = await razorpay.orders.create(options);
      console.log(order);
      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating order');
    }
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

  app.post('/admin', async (req, res) => {
    if (req.body.token) {
      // return res.status(401).json({ message: 'JWT token is missing' });
    let tokencheck =jwt.verify(req.body.token,process.env.SECRET_KEY);
    console.log('tokencheck',tokencheck);
    if(tokencheck)
    {
      let msg = await Message.find({});
      // console.log(msg);
      let data =[];
      msg.map((item)=>
      {
        if(item.email===process.env.ADMIN_MAIL)
        {
          return;
        }
        data.push({name:item.name,email:item.email,message:item.message})
      })
      console.log('data',data)
      return res.json({ message: 'Login successful', data });
    }
  }

    console.log("body",req.body);
    console.log('params',req.params);
    const { email, password } = req.body;
  
    try {
      // Check if user with the provided email exists
      const user = await EmployeeModel.findOne({ email});
      console.log('user,email,password is for admin',user,email,password);
      if (!user) {
        return res.status(401).json({ message: 'Admin not found' });
      }
      console.log('user found');
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(402).json({ message: 'Invalid password' });
      }
      console.log('password matched')
      if(email!==process.env.ADMIN_MAIL)
      {
        return res.status(300).json({message:'This is not admin'})
      }
      console.log('admin found');
      let msg = await Message.find({});
      // console.log(msg);
      let data =[];
      msg.map((item)=>
      {
        if(item.email===process.env.ADMIN_MAIL)
        {
          return;
        }
        data.push({name:item.name,email:item.email,message:item.message})
      })
      console.log('data',data)
      res.json({ message: 'Login successful', data });
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
  
app.get('*',(req,res)=>
{
  res.sendFile(__dirname+"/build/index.html");
})
app.listen(port, () => {
  console.log("Server is running");
});
