const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
// Create a token generator with the default settings:
const randToken = require('rand-token');

const schema = mongoose.Schema(
  {
    invitationCode: {
      type: String,
      default: function () {
        return randToken.generate(6);
      },
    },
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
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    createdByUser: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    dish: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Dish',
    },
    participants: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Participant',
      },
    ],
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
 * @typedef Event
 */
const Event = mongoose.model('Event', schema);

module.exports = Event;
