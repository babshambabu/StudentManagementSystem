
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const studentRoutes = require('./routes/student');
const libraryRoutes = require('./routes/library');
const feeRoutes = require('./routes/fees');
const adminRoutes = require('./routes/admin');
console.log(process.env.MONGO_URI)
// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/admin', adminRoutes);



// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
