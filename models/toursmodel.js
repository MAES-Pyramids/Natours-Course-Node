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
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult'
      }
    },
    ratingsAverage: {
      type: 'number',
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: val => Math.round(val * 10) / 10
    },
    ratingsQuantity: {
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
    },
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      address: String,
      description: String
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number
      }
    ],
    guides: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
//-------------------Indexes----------------//
toursSchema.index({ price: 1, ratingsAverage: -1 });
toursSchema.index({ slug: 1 });
//-------------------Virtuals----------------//
toursSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

//Virtual Populate
toursSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id'
});
//------------Documents middleware-----------//
// toursSchema.pre('save', async function(next) {
//   const guidesPromises = this.guides.map(async id => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });
toursSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
//-------------Queries middleware------------//
// toursSchema.post(/^find/, function(doc, next) {
//   console.log(`Query took ${(Date.now() - this.start) / 1000} seconds!`);
//   next();
// });
toursSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});
toursSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt'
  });
  next();
});
//------------Aggregation middleware---------//
// toursSchema.pre('aggregate', function(next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//   next();
// });
//--------------------Model------------------//
const Tour = mongoose.model('Tour', toursSchema);
//--------------------Export-----------------//
module.exports = Tour;
