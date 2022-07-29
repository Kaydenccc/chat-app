const cors = require('cors');
const express = require('express');
const middleware = (app) => {
  app.use(cors());
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
};
module.exports = middleware;
