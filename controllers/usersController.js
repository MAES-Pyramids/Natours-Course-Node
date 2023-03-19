const User = require('./../models/usersmodel');
const catchAsyncError = require('./../utils/catchAsyncError');
// const AppError = require('./../utils/appError');

//------------handler functions ------------//
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    users
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'Fail',
    time: req.time,
    message: 'This route is not yet defined'
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'Fail',
    time: req.time,
    message: 'This route is not yet defined'
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'Fail',
    time: req.time,
    message: 'This route is not yet defined'
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'Fail',
    time: req.time,
    message: 'This route is not yet defined'
  });
};
