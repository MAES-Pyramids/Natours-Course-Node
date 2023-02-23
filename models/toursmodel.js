const mongoose = require('mongoose');
//-------------------Schema----------------//
const toursSchema = new mongoose.Schema({
  name: {
    type: 'string',
    unique: true,
    required: [true, 'A tour must have a name']
  },
  rating: {
    type: 'number',
    default: 4.5
  },
  price: {
    type: 'number',
    required: [true, 'A tour must have a price']
  }
});
//-------------------Model----------------//
const Tour = mongoose.model('Tour', toursSchema);
//-------------------Export----------------//
module.exports = Tour;
