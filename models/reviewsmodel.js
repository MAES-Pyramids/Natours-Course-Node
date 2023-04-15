const mongoose = require('mongoose');
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
//--------------------Model------------------//
const Review = mongoose.model('Review', reviewsSchema);
//--------------------Export-----------------//
module.exports = Review;