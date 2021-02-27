const httpStatus = require('http-status');
const { Dish } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a dish
 * @param {Object} dishBody
 * @returns {Promise<Dish>}
 */
const createDish = async (dishBody) => {
  if (await Dish.isNameTaken(dishBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Dish name is already taken');
  }
  const dish = await Dish.create(dishBody);
  return dish;
};

/**
 * Get dishes
 * @returns {Promise<Dish>}
 */
const getDishes = async () => {
  return Dish.find();
};

/**
 * Get dish by id
 * @param {ObjectId} id
 * @returns {Promise<Dish>}
 */
const getDishById = async (id) => {
  return Dish.findById(id);
};

/**
 * Get dish by name
 * @param {string} name
 * @returns {Promise<Dish>}
 */
const getDishByEmail = async (name) => {
  return Dish.findOne({ name });
};

/**
 * Update dish by id
 * @param {ObjectId} dishId
 * @param {Object} updateBody
 * @returns {Promise<Dish>}
 */
const updateDishById = async (dishId, updateBody) => {
  const dish = await getDishById(dishId);
  if (!dish) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dish not found');
  }
  if (updateBody.name && (await Dish.isNameTaken(updateBody.name, dishId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Dish name already taken');
  }
  Object.assign(dish, updateBody);
  await dish.save();
  return dish;
};

/**
 * Delete dish by id
 * @param {ObjectId} dishId
 * @returns {Promise<Dish>}
 */
const deleteDishById = async (dishId) => {
  const dish = await getDishById(dishId);
  if (!dish) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dish not found');
  }
  await dish.remove();
  return dish;
};

module.exports = {
  createDish,
  getDishes,
  getDishById,
  getDishByEmail,
  updateDishById,
  deleteDishById,
};
