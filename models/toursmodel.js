const mongoose = require('mongoose');
const slugify = require('slugify');

//-------------------Schema----------------//
const toursSchema = new mongoose.Schema(
  {
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
    slug: String,
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
      default: Date.now(),
      select: false
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
//-------------------Virtuals----------------//
toursSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});
//------------Documents middleware-----------//
toursSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
//-------------Queries middleware------------//
toursSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});
toursSchema.post(/^find/, function(doc, next) {
  console.log(`Query took ${(Date.now() - this.start) / 1000} seconds!`);
  next();
});
//------------Aggregation middleware---------//
toursSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});
//--------------------Model------------------//
const Tour = mongoose.model('Tour', toursSchema);
//--------------------Export-----------------//
module.exports = Tour;
