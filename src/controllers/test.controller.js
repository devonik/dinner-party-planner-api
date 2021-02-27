const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');

const resetDb = catchAsync(async (req, res) => {
  res.send(
    mongoose.connection.db
      .dropDatabase()
      .then((success) => success)
      .catch((error) => error)
  );
});

module.exports = {
  resetDb,
};
