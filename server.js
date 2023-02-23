const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
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

//--------------------CRUD------------------//
// const testTour = new Tour({
//   name: 'The Park Camper',
//   rating: 4.7,
//   price: 497
// });
// testTour
//   .save()
//   .then(doc => {
//     console.log(doc);
//   })
//   .catch(err => {
//     console.log(err);
//   });
//--------------------CRUD------------------//

//------------------Listener----------------//
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
