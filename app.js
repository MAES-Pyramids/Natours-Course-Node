const morgan = require('morgan');
const express = require('express');
const rateLimit = require('express-rate-limit');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorsController');

const toursRouter = require('./routes/toursRoutes');
const usersRouter = require('./routes/usersRoutes');
//-------------------------------------------//
const app = express();
//------------Global middleware--------------//
app.use(express.json());
app.use(morgan('dev'));

// Add a timestamp to each request
app.use((req, res, next) => {
  req.time = new Date().toISOString();
  next();
});

// Serve static content located in the "public" directory.
app.use(express.static('public'));

// Implement a simple rate limiting
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);
//--------------Global Routing--------------//

app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

// Handling invalid Routes
app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Sorry, the page you are trying to access is not available`,
      404
    )
  );
});

//-------------------------------------------//
// Error Handling Middleware
app.use(globalErrorHandler);
//-------------------------------------------//
module.exports = app;
