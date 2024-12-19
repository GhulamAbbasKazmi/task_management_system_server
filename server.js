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


app.listen(5000,
    console.log('Server listening on port: 5000')
)


// Use the routes
app.use('/tasks', taskItemRoutes)
app.use('/users', userRoutes);

