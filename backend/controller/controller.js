const AuthChatAppModel = require('../src/model/authChatAppModel');
const ChatModel = require('../src/model/model');
const Controller = {
  getAllData: (req, res) => {
    ChatModel.find({}, function (err, chat) {
      if (err) return console.log(err);
      console.log(chat);
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
    if (!req.body.username || !req.body.avatar || !req.body.msg) {
      return res.status(404).json({ msg: 'Data tidak boleh kosong' });
    }
    const data = {
      username: req.body.username,
      avatar: req.body.avatar,
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
  getUsersAuth: (req, res) => {
    AuthChatAppModel.find((err, data) => {
      if (err) return console.log(err);
      if (data.length <= 0) {
        return res.status(404).json({ msg: 'Data tidak ditemukan', data });
      }
      res.status(200).json({ msg: 'successfully', data });
    });
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
