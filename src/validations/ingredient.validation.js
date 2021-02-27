const Joi = require('joi');
const { objectId } = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    subtitle: Joi.string().optional(),
    imageUrl: Joi.string().optional(),
    dishId: Joi.string().required().custom(objectId),
    createdByUserId: Joi.string().custom(objectId),
  }),
};

const getAll = {
  query: Joi.object().keys({
    title: Joi.string(),
  }),
};

const getById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const update = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      subtitle: Joi.string(),
      imageUrl: Joi.string(),
      dishId: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById,
};
