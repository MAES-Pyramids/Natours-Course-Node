const app = require('./app');
//------------------Listener----------------//
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
