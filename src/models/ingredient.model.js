const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    dishId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Dish',
    },
    createdByUserId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
schema.plugin(toJSON);

/**
 * Check if title is taken
 * @param {string} title - The entry title
 * @returns {Promise<boolean>}
 */
schema.statics.isTitleTaken = async function (title, excludeId) {
  const entry = await this.findOne({ title, _id: { $ne: excludeId } });
  return !!entry;
};

/**
 * @typedef Ingredient
 */
const Ingredient = mongoose.model('Ingredient', schema);

module.exports = Ingredient;
