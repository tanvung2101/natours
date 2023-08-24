const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.deleteOne = Model => catchAsync(async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
  
    if(!doc){
      return next(new AppError('No document found with that Id', 404))
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = Model => catchAsync(async (req, res) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if(!doc){
    return next(new AppError('No document found with that Id', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.createOne = Model => catchAsync(async (req, res) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
});

exports.getOne = (Model, popOptions) => catchAsync(async (req, res) => {
  let query = Model.findById(req.params.id);
  if(query) query.populate(popOptions)
  const doc = await query
  // await doc.findOne({_id: req.params.id})

if(!doc){
  return next(new AppError('No docuemnt found with that Id', 404))
}

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.getAll = Model => catchAsync(async (req, res) => {
  // To allow for nested GET reviews on tour (hack)
  let filter = {};
  if(req.parmas?.tourId) filter = {tour: req.parmas.tourId}


  const features = new APIFeatures(Model.find(filter), req.query)
  .filter()
  .sort()
  .limitFields()
  .paginate();
// const doc = await features.query.explain();
const doc = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    result: doc.length,
    data: {
      data:doc,
    },
  });
});
