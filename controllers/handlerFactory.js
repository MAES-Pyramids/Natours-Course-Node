const catchAsyncError = require('./../utils/catchAsyncError');
const AppError = require('./../utils/appError');
//------------handler functions ------------//
exports.deleteOne = Model => {
  return catchAsyncError(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError(`No ${Model} found with that ID`, 404));
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  });
};
