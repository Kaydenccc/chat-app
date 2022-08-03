const express = require('express');
const Controller = require('../controller/controller');
const router = express.Router();

// ROUTES API
router.get('/chats', Controller.getAllData);
router.get('/chats/:IdChat', Controller.getOneData);
router.post('/chats/post/:username', Controller.postData);
router.delete('/chats/:IdChat', Controller.DeleteOneData);
router.get('/chats/search/:search', Controller.getSearchData);

module.exports = router;
