require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middlewares/errorHandler');

// Routes
const userRoutes = require('./routes/users');
const listingRoutes = require('./routes/listings');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/listings', listingRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
