// const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorsController');

const toursRouter = require('./routes/toursRoutes');
const viewsRouter = require('./routes/viewsRoutes');
const usersRouter = require('./routes/usersRoutes');
const reviewsRouter = require('./routes/reviewsRoutes');
//-------------------------------------------//
const app = express();

// Set the view engine to Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// Serve static content located in the "public" directory.
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
//------------Global middleware--------------//
// Enable CORS
// app.use(cors());

// Set security HTTP headers
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://api.mapbox.com'],
      workerSrc: ['blob:'],
      objectSrc: ["'none'"],
      styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
      fontSrc: ["'self'", 'https:', 'data:'],
      imgSrc: ["'self'", 'data:'],
      connectSrc: ["'self'", 'https://api.mapbox.com']
    }
  })
);
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Implement a simple rate limiting
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Development logging
app.use(morgan('dev'));

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

// Add a timestamp to each request
// app.use((req, res, next) => {
//   req.time = new Date().toISOString();
//   next();
// });
//--------------Global Routing--------------//
app.use('/api/v1/reviews', reviewsRouter);
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);
app.use('/', viewsRouter);

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
