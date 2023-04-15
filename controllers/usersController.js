const catchAsyncError = require('./../utils/catchAsyncError');
const AppError = require('./../utils/appError');
const User = require('./../models/usersmodel');
const factory = require('./handlerFactory');

//------------handler functions ------------//
const filterObj = (obj, ...allowedFields) => {
  const returnedFiled = {};
  Object.keys(obj).forEach(key => {
    if (allowedFields.includes(key)) returnedFiled[key] = obj[key];
  });
  return returnedFiled;
};
//----------Normal CRUD functions ----------//
exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);
exports.createUser = factory.createOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
// ------------Active User Operations ----------//
exports.UpdateMe = catchAsyncError(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updatePassword',
        400
      )
    );
  }
  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.DeleteMe = catchAsyncError(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null
  });
});
