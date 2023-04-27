const mongoose = require('mongoose');
const Tour = require('./toursmodel');
//-------------------Schema----------------//
const reviewsSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review cannot be empty']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'A review must have a rating']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'A review must belong to a tour']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A review must belong to a user']
  }
});
//---------------Queries Middleware-----------//
reviewsSchema.pre(/^find/, function(next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name -_id'
  // }).populate({
  //   path: 'user',
  //   select: 'name photo -_id'
  // });
  this.populate({
    path: 'user',
    select: 'name photo -_id'
  });
  next();
});
//--------------------Static-----------------//
reviewsSchema.statics.calcAverageRatings = async function(tourId) {
  const stats = await this.aggregate([
    { $match: { tour: tourId } },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5
    });
  }
};
//----------------Indexing-------------------//
reviewsSchema.index({ tour: 1, user: 1 }, { unique: true });
//--------------------Document-----------------//
reviewsSchema.post('save', function() {
  // this points to current review
  this.constructor.calcAverageRatings(this.tour);
});
// Execute on findByIdAndUpdate and findByIdAndDelete
reviewsSchema.pre(/^findOneAnd/, async function(next) {
  this.review = await this.findOne();
  next();
});

reviewsSchema.post(/^findOneAnd/, async function() {
  await this.review.constructor.calcAverageRatings(this.review.tour);
});
//--------------------Model------------------//
const Review = mongoose.model('Review', reviewsSchema);
//--------------------Export-----------------//
module.exports = Review;
