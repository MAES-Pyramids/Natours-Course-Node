const mongoose = require('mongoose');
const dotenv = require('dotenv');

//-------------------Config----------------//
dotenv.config({ path: './config.env' });
//--------------------DB-------------------//
const app = require('./app');

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

//------------------Listener----------------//
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
