const express = require('express');
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
};
module.exports = Controller;
