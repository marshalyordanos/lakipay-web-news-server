const express = require('express');

const newRoute = require('./news/newsRouter');


const router = express.Router();

const defaultRoutes = [
 
  {
    path: '/news',
    route: newRoute,
  },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });

module.exports = router;
