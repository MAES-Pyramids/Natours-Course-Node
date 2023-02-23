const mongoose = require('mongoose');
//-------------------Schema----------------//
const toursSchema = new mongoose.Schema({
  name: {
    type: 'string',
    unique: true,
    trim: true,
    required: [true, 'A tour must have a name']
  },
  rating: {
    type: 'number',
    default: 4.5
  },
  price: {
    type: 'number',
    required: [true, 'A tour must have a price']
  },
  duration: {
    type: 'number',
    required: [true, 'A tour must have a duration']
  },
  maxGroupSize: {
    type: 'number',
    required: [true, 'A tour must have a max group size']
  },
  difficulty: {
    type: 'string',
    required: [true, 'A tour must have a difficulty']
  },
  ratingAverage: {
    type: 'number',
    default: 4.5
  },
  ratingQuantity: {
    type: 'number',
    default: 0
  },
  summary: {
    type: 'string',
    trim: true,
    required: [true, 'A tour must have a summary']
  },
  description: {
    type: 'string',
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  startDates: [Date]
});
//-------------------Model----------------//
const Tour = mongoose.model('Tour', toursSchema);
//-------------------Export----------------//
module.exports = Tour;
