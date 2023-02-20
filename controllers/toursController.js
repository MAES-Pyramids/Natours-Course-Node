const fs = require('fs');
//----------------read data------------------//
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
//------------handler functions ------------//
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    time: req.time,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: ` new updated tour`,
    },
  });
};

exports.deleteTour = (req, res) => {
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
