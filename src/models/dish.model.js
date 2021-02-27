const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const dishSchema = mongoose.Schema(
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
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    ingredients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
      },
    ],
    createdByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
dishSchema.plugin(toJSON);

/**
 * Check if title is taken
 * @param {string} title - The dish's title
 * @returns {Promise<boolean>}
 */
dishSchema.statics.isTitleTaken = async function (title, excludeDishId) {
  const dish = await this.findOne({ title, _id: { $ne: excludeDishId } });
  return !!dish;
};

/**
 * @typedef Dish
 */
const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
