const express = require('express');
const authRoute = require('./auth.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

//Data
const userRoute = require('./user.route');
const dishRoute = require('./dish.route');
const ingredientRoute = require('./ingredient.route');

//Test
const testRoute = require('./test.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/dish',
    route: dishRoute,
  },
  {
    path: '/ingredient',
    route: ingredientRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
  {
    path: '/test',
    route: testRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
