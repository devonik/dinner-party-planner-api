const controller = require('../../controllers/test.controller');
const express = require('express');

const router = express.Router();

router.get('/resetDb', controller.resetDb);
module.exports = router;
