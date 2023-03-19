const User = require('./../models/usersmodel');
const catchAsyncError = require('./../utils/catchAsyncError');
const AppError = require('./../utils/appError');
const JWT = require('jsonwebtoken');
//-----------------JWT-----------------------//
function signToken(id) {
  return JWT.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
}
//------------handler functions ------------//
exports.signup = catchAsyncError(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });
  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email and password exist
  if (!email && !password)
    return next(new AppError('Please provide email and password', 400));
  if (!email) return next(new AppError('Please provide email', 400));
  if (!password) return next(new AppError('Please provide password', 400));

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');
  const correctPass = await user?.correctPassword(password, user.password);
  if (!user || !correctPass)
    return next(new AppError('Incorrect email or password', 401));

  // 3) If everything ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token
  });
});
