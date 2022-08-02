const express = require('express');
const Controller = require('../controller/controller');
const router = express.Router();

//ROUTES AUTHENTIFICATION
router.get('/users', Controller.getUsersAuth);
router.post('/user', Controller.postUserAuth);

module.exports = router;
