const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
require('dotenv').config(); 

const userRoutes = require('./routes/userRoutes');
const taskItemRoutes = require("./routes/taskItemRoutes");



const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.DB)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));



// Use the routes
app.use('/tasks', taskItemRoutes)
app.use('/users', userRoutes);

// Listen on dynamic port or default to 5000 for local development
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});