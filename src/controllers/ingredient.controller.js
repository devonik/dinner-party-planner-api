const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { ingredientService } = require('../services');

const create = catchAsync(async (req, res) => {
  const item = await ingredientService.create(req.body, req.user);
  res.status(httpStatus.CREATED).send(item);
});

const getAll = catchAsync(async (req, res) => {
  const result = await await ingredientService.getAll();
  res.send(result);
});

const getById = catchAsync(async (req, res) => {
  const item = await ingredientService.getById(req.params.id);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ingredient not found');
  }
  res.send(item);
});

const updateById = catchAsync(async (req, res) => {
  const item = await ingredientService.updateById(req.params.id, req.body);
  res.send(item);
});

const deleteById = catchAsync(async (req, res) => {
  await ingredientService.deleteById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
