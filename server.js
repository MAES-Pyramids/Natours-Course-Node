const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const e = require('express');
//-------------------Config----------------//
dotenv.config({ path: './config.env' });
//--------------------DB-------------------//
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(console.log('DB connection successful!'));

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
const Tour = mongoose.model('Tour', toursSchema);
//--------------------CRUD------------------//
const testTour = new Tour({
  name: 'The Park Camper',
  rating: 4.7,
  price: 497
});
testTour
  .save()
  .then(doc => {
    console.log(doc);
  })
  .catch(err => {
    console.log(err);
  });
//--------------------CRUD------------------//

//------------------Listener----------------//
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
