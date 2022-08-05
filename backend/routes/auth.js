const express = require('express');
const Controller = require('../controller/controller');
const router = express.Router();

//ROUTES AUTHENTIFICATION
router.post('/users', Controller.postsUsersAuth);
router.post('/user', Controller.postUserAuth);
router.get('/user/:email', Controller.getUserAuthByEmail);

module.exports = router;
