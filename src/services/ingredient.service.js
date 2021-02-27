const httpStatus = require('http-status');
const { Ingredient, Dish } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a dish
 * @param {Object} body
 * @returns {Promise<Ingredient>}
 */
const create = async (body, user) => {
  if (await Ingredient.isTitleTaken(body.title)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Ingredient title is already taken');
  }

  body.createdByUserId = user.id;
  const ingredient = await Ingredient.create(body);
  const dish = await Dish.findById(body.dishId);
  dish.ingredients.push(ingredient);
  dish.save();
  return ingredient;
};

/**
 * Get ingredients
 * @returns {Promise<Ingredient>}
 */
const getAll = async () => {
  return Ingredient.find();
};

/**
 * Get dish by id
 * @param {ObjectId} id
 * @returns {Promise<Ingredient>}
 */
const getById = async (id) => {
  return await Ingredient.findById(id).populate('dishId');
};

/**
 * Get ingredient by title
 * @param {string} title
 * @returns {Promise<Ingredient>}
 */
const getByTitle = async (title) => {
  return Ingredient.findOne({ title });
};

/**
 * Update ingredient by id
 * @param {ObjectId} id
 * @param {Object} body
 * @returns {Promise<Ingredient>}
 */
const updateById = async (id, updateBody) => {
  const ingredient = await getById(id);
  if (!ingredient) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ingredient not found');
  }
  if (updateBody.title && (await Ingredient.isTitleTaken(updateBody.title, id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Ingredient title already taken');
  }
  Object.assign(ingredient, updateBody);
  await ingredient.save();
  return ingredient;
};

/**
 * Delete ingredient by id
 * @param {ObjectId} id
 * @returns {Promise<Ingredient>}
 */
const deleteById = async (id) => {
  const ingredient = await getById(id);
  if (!ingredient) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ingredient not found');
  }
  await ingredient.remove();
  return ingredient;
};

module.exports = {
  create,
  getAll,
  getById,
  getByTitle,
  updateById,
  deleteById,
};
