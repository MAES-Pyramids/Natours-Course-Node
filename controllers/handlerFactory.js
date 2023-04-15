const catchAsyncError = require('./../utils/catchAsyncError');
const APIFeatures = require('./../utils/apiFeatures');
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

exports.updateOne = Model => {
  return catchAsyncError(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError(`No ${Model} found with that ID`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });
};
exports.createOne = Model => {
  return catchAsyncError(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });
};
exports.getOne = (Model, populateOptions) => {
  return catchAsyncError(async (req, res, next) => {
    const doc = populateOptions
      ? await Model.findById(req.params.id).populate(populateOptions)
      : await Model.findById(req.params.id);

    if (!doc) {
      return next(new AppError(`No ${Model} found with that ID`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: doc
    });
  });
};

exports.getAll = Model => {
  return catchAsyncError(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.tourID) filter = { tour: req.params.tourID };
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .projection()
      .paginate();

    // const doc = await features.query.explain();
    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc
    });
  });
};
