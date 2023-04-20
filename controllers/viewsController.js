const Tour = require('./../models/toursmodel');
const AppError = require('./../utils/appError');
const catchAsyncError = require('./../utils/catchAsyncError');

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
// Account page
exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

// .set(
//   'Content-Security-Policy',
//   "default-src 'self' https://*.mapbox.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
// )
