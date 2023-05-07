const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const hpp = require('hpp');
const xss = require('xss-clean');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorsController');

const toursRouter = require('./routes/toursRoutes');
const viewsRouter = require('./routes/viewsRoutes');
const usersRouter = require('./routes/usersRoutes');
const reviewsRouter = require('./routes/reviewsRoutes');
const bookingsRoutes = require('./routes/bookingRoutes');
const bookingController = require('./controllers/bookingController');
//-------------------------------------------//
const app = express();

// Trust proxies
app.enable('trust proxy');

// Set the view engine to Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
//------------Global middleware--------------//
// Enable CORS
app.use(cors());
app.options('*', cors());

// Serve static content located in the "public" directory.
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://api.mapbox.com', 'https://js.stripe.com'],
      workerSrc: ['blob:'],
      objectSrc: ["'none'"],
      styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
      fontSrc: ["'self'", 'https:', 'data:'],
      imgSrc: ["'self'", 'data:'],
      connectSrc: [
        "'self'",
        'https://api.mapbox.com',
        'wss://natours-pw5m.onrender.com:54819',
        'https://checkout.stripe.com'
      ],
      frameSrc: ["'self'", 'https://js.stripe.com', 'https://hooks.stripe.com']
    }
  })
);

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Implement a simple rate limiting
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Stripe webhook, BEFORE body-parser, because stripe needs the body as stream
app.post(
  '/webhook-checkout',
  bodyParser.raw({ type: 'application/json' }),
  bookingController.webhookCheckout
);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

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

// Compress all text sent to clients
app.use(compression());

// Add a timestamp to each request
// app.use((req, res, next) => {
//   req.time = new Date().toISOString();
//   next();
// });
//--------------Global Routing--------------//
app.use('/api/v1/bookings', bookingsRoutes);
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
