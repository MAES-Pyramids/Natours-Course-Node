const morgan = require('morgan');
const express = require('express');

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

//-------------------------------------------//
module.exports = app;
