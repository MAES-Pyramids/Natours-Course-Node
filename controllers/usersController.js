const sharp = require('sharp');
const multer = require('multer');
const factory = require('./handlerFactory');
const User = require('./../models/usersmodel');
const AppError = require('./../utils/appError');
const catchAsyncError = require('./../utils/catchAsyncError');
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
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
// ---------------Upload Photos -------------//
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else cb(new AppError('Not an image! Please upload only images.', 400), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});
exports.uploadUserPhoto = upload.single('photo');
//----------------Resize Photos -------------//
exports.resizeUserPhoto = catchAsyncError(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});
// ---------------Update User -------------//
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
  if (req.file) filteredBody.photo = req.file.filename;

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
// ---------------Delete User -------------//
exports.DeleteMe = catchAsyncError(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null
  });
});
