const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const dishSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
dishSchema.plugin(toJSON);

/**
 * Check if email is taken
 * @param {string} email - The dish's name
 * @returns {Promise<boolean>}
 */
dishSchema.statics.isNameTaken = async function (name, excludeDishId) {
  const dish = await this.findOne({ name, _id: { $ne: excludeDishId } });
  return !!dish;
};

/**
 * @typedef Dish
 */
const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
