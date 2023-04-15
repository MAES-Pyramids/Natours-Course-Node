const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('./../../models/toursmodel');
const User = require('./../../models/usersmodel');
const Review = require('./../../models/reviewsmodel');
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
//------------------Read_File----------------//
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);
//--------------------CRUD------------------//
// Import data into DB
async function importData() {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
}
// Delete all data from DB
async function deelteData() {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
}
// process.argv to check passed arguments
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deelteData();
}
