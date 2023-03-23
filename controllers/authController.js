const { promisify } = require('util');
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
  const login_Password = password;
  // 1) Check if email and password exist
  if (!email && !login_Password)
    return next(new AppError('Please provide email and password', 400));
  if (!email) return next(new AppError('Please provide email', 400));
  if (!login_Password)
    return next(new AppError('Please provide password', 400));

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');
  const correctPass = await user?.correctPassword(
    login_Password,
    user.password
  );
  if (!user || !correctPass)
    return next(new AppError('Incorrect email or password', 401));

  // 3) If everything ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token
  });
});

exports.protect = catchAsyncError(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token)
    return next(
      new AppError('You are not logged in! Please login to get access.', 401)
    );

  // 2) Verification token
  const decoded = await promisify(JWT.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // Grant access to protected route
  req.user = currentUser;
  next();
});
