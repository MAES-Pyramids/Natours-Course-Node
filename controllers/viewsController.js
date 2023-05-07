const Tour = require('./../models/toursmodel');
const Booking = require('./../models/bookingModel');
const AppError = require('./../utils/appError');
const catchAsyncError = require('./../utils/catchAsyncError');

//------------------------------------------------//
exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking')
    res.locals.alert = `Your booking has been successfully done! Please check your email for confirmation.
     If your booking doesn't show up here immediately, please come back later.`;
  next();
};
//------------------------------------------------//
// overview page
exports.getOverview = catchAsyncError(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();
  // 2) Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});
// tour page
exports.getTour = catchAsyncError(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});
// Login and signup
exports.getLoginForm = (req, res) => {
  if (req.isLogin) return res.redirect('/');
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};
exports.getSignupForm = (req, res) => {
  if (req.isLogin) return res.redirect('/');
  res.status(200).render('signup', {
    title: 'Create your account!'
  });
};
// Reset Password
exports.getResetPassForm = (req, res) => {
  if (req.isLogin) return res.redirect('/');
  res.status(200).render('reset_ask', {
    title: 'Forget Password'
  });
};
exports.getResetPassPatchForm = (req, res) => {
  if (req.isLogin) return res.redirect('/');
  res.status(200).render('reset_patch', {
    title: 'Reset Password'
  });
};
// Account page
exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};
// My Tours page
exports.getMyTours = catchAsyncError(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours
  });
});
