const AuthChatAppModel = require('../src/model/authChatAppModel');
const ChatModel = require('../src/model/model');
const jwt = require('jsonwebtoken');
const Controller = {
  getAllData: (req, res) => {
    ChatModel.find({}, function (err, chat) {
      if (err) return console.log(err);
      res.status(200).json({ msg: 'GET successfully', data: chat });
    });
  },
  getOneData: (req, res) => {
    ChatModel.findById(req.params.IdChat, function (err, chat) {
      if (err) return console.log(err);
      res.status(200).json({ msg: 'GET successfully', data: chat });
    });
  },

  postData: (req, res) => {
    if (!req.body.username || !req.body.msg || !req.body.email) {
      return res.status(404).json({ msg: 'Data tidak boleh kosong' });
    }
    console.log(req.params.username);
    console.log(req.body.username);
    if (req.params.username === req.body.username) {
      req.body.received = true;
    }
    const data = {
      username: req.body.username,
      email: req.body.email,
      msg: req.body.msg,
      received: req.body.received,
    };
    ChatModel.create(data, function (err, chat) {
      if (err) return console.log(err);
      res.status(201).json({ msg: 'POST successfully', data: chat });
    });
  },
  DeleteOneData: (req, res) => {
    ChatModel.findByIdAndRemove(req.params.IdChat, function (err, chat) {
      if (err) return console.log(err);
      res.status(200).json({ msg: 'DELETE successfully', data: chat });
    });
  },
  getSearchData: (req, res) => {
    ChatModel.find(
      {
        username: { $regex: '.*' + req.params.search + '.*', $options: 'i' },
      },
      function (err, chat) {
        if (err) return console.log(err);
        res.status(200).json({ msg: 'GET successfully', data: chat });
      }
    );
  },

  //!!CONTROLER AUTHENTIFICATIOPN
  postsUsersAuth: (req, res) => {
    AuthChatAppModel.findOne({ email: req.body.email, password: req.body.password }, (err, data) => {
      if (err) return console.log(err);
      if (!data) {
        return res.status(404).json({ msg: 'Email is not found', data });
      }
      const token = jwt.sign({ id: data._id }, 'ScreatedTokenJWT', { expiresIn: 60 });
      res.header('set-token', token).status(200).json({ msg: 'successfully', data, token: token });
    });
  },
  getUserAuthByEmail: (req, res) => {
    console.log('PARAM:', req.params.email);
    if (req.params.email) {
      AuthChatAppModel.find({ email: req.params.email }, 'email avatar first_name last_name', function (err, chat) {
        if (err) return console.log(err);

        res.status(200).json({ msg: 'GET successfully', data: chat });
      });
    }
  },
  postUserAuth: (req, res) => {
    console.log('REQUEST BODY: ', req.body);
    console.log('REQUEST FILE: ', req.file);
    if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password) {
      return res.status(400).json({ msg: 'Data tidak tidak boleh kosong' });
    }
    if (!req.file) {
      res.status(400).json({ msg: 'Data tidak tidak boleh kosong', file: req.file });
    }

    const dataAuth = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      avatar: req.file.path,
      email: req.body.email,
      password: req.body.password,
    };
    AuthChatAppModel.create(dataAuth, (err, data) => {
      if (err) return console.log(err);
      if (data.length <= 0) {
        return res.status(404).json({ msg: 'Data tidak ditemukan', data });
      }
      res.status(201).json({ msg: 'Post data successfully', data });
    });
  },
};
module.exports = Controller;
