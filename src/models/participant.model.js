const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const schema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    avatarPath: {
      type: String,
      trim: true,
    },
    invitationCode: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
schema.plugin(toJSON);

/**
 * @typedef Participant
 */
const Participant = mongoose.model('Participant', schema);

module.exports = Participant;
