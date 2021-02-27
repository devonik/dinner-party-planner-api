const httpStatus = require('http-status');
const { Dish } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a dish
 * @param {Object} dishBody
 * @returns {Promise<Dish>}
 */
const createDish = async (dishBody, user) => {
  if (await Dish.isTitleTaken(dishBody.title)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Dish title is already taken');
  }

  dishBody.createdByUserId = user.id;
  const dish = await Dish.create(dishBody);
  return dish;
};

/**
 * Get dishes
 * @returns {Promise<Dish>}
 */
const getDishes = async () => {
  return Dish.find().populate('ingredients');
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
 * Get dish by title
 * @param {string} title
 * @returns {Promise<Dish>}
 */
const getDishByTitle = async (title) => {
  return Dish.findOne({ title });
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
  if (updateBody.title && (await Dish.isTitleTaken(updateBody.title, dishId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Dish title already taken');
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
  getDishByTitle,
  updateDishById,
  deleteDishById,
};
