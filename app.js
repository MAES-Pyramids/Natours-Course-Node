const morgan = require('morgan');
const express = require('express');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorsController');

const toursRouter = require('./routes/toursRoutes');
const usersRouter = require('./routes/usersRoutes');
//-------------------------------------------//
const app = express();
//---------------middleware------------------//
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  req.time = new Date().toISOString();
  next();
});

app.use(express.static('public'));

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
