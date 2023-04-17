const Tour = require('./../models/toursmodel');
const catchAsyncError = require('./../utils/catchAsyncError');
//------------------------------------------------//
exports.getOverview = catchAsyncError(async (req, res) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();
  // 2) Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});
exports.getTour = catchAsyncError(async (req, res) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});
