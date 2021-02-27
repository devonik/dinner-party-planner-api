const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { dishService } = require('../services');

const createDish = catchAsync(async (req, res) => {
  const dish = await dishService.createDish(req.body);
  res.status(httpStatus.CREATED).send(dish);
});

const getDishes = catchAsync(async (req, res) => {
  const result = await dishService.getDishes();
  res.send(result);
});

const getDish = catchAsync(async (req, res) => {
  const dish = await dishService.getDishById(req.params.dishId);
  if (!dish) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dish not found');
  }
  res.send(dish);
});

const updateDish = catchAsync(async (req, res) => {
  const dish = await dishService.updateDishById(req.params.dishId, req.body);
  res.send(dish);
});

const deleteDish = catchAsync(async (req, res) => {
  await dishService.deleteDishById(req.params.dishId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createDish,
  getDishes,
  getDish,
  updateDish,
  deleteDish,
};
