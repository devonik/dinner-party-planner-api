const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createDish = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    subtitle: Joi.string().optional(),
    description: Joi.string().optional(),
    createdByUserId: Joi.string().custom(objectId),
  }),
};

const getDishes = {
  query: Joi.object().keys({
    title: Joi.string(),
  }),
};

const getDish = {
  params: Joi.object().keys({
    dishId: Joi.string().custom(objectId),
  }),
};

const updateDish = {
  params: Joi.object().keys({
    dishId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      subtitle: Joi.string(),
      description: Joi.string(),
    })
    .min(1),
};

const deleteDish = {
  params: Joi.object().keys({
    dishId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createDish,
  getDishes,
  getDish,
  updateDish,
  deleteDish,
};
