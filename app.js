const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
//-------------------------------------------//
const app = express();
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
//---------------middleware------------------//
app.use(express.json());
app.use(morgan('dev'));

// app.use((req, res, next) => {
//   req.time = new Date().toISOString();
//   next();
// });

// app.use((req, res, next) => {
//   console.log('Hello from the middleware stack👋');
//   console.log(`Request at ${req.time}`);
//   next();
// });
//------------handler functions ------------//
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    time: req.time,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1; // *1 converts string to number
  const tour = tours.find((record) => record.id == id); //find return object instead array return by filter
  if (tour) {
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } else {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
};

const createTour = (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  const newTour = Object.assign(req.body, { id: id });
  tours.push(newTour);
  //-------------------
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: 'success',
        data: {
          newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: ` new updated tour`,
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 + 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'Fail',
    time: req.time,
    message: 'This route is not yet defined',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'Fail',
    time: req.time,
    message: 'This route is not yet defined',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'Fail',
    time: req.time,
    message: 'This route is not yet defined',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'Fail',
    time: req.time,
    message: 'This route is not yet defined',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'Fail',
    time: req.time,
    message: 'This route is not yet defined',
  });
};

//------------------ROUTES------------------//
// app.get('/api/v1/tours', getAlltours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete(`/api/v1/tours/:id`, deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);
//------------------Listener----------------//
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
