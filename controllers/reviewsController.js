const Review = require('./../models/reviewsModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsyncError = require('./../utils/catchAsyncError');
const AppError = require('./../utils/appError');
//----------------Alias Methods----------------//
exports.getAllReviews = catchAsyncError(async (req, res, next) => {
  const features = new APIFeatures(Review.find(), req.query)
    .filter()
    .sort()
    .projection()
    .paginate();

  const reviews = await features.query;

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    reviews
  });
});
exports.createReview = catchAsyncError(async (req, res, next) => {
  const newReview = await Review.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      newReview: newReview
    }
  });
});
exports.getReview = catchAsyncError(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError('No reviews found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    review
  });
});
exports.updateReview = catchAsyncError(async (req, res, next) => {
  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!updatedReview) {
    return next(new AppError('No reviews found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      updatedReview
    }
  });
});
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) {
    return next(new AppError('No reviews found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});
