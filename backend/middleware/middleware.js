const cors = require('cors');
const express = require('express');
const Pusher = require('pusher');
const mongoose = require('mongoose');

const middleware = (app) => {
  const pusher = new Pusher({
    appId: '1446659',
    key: '92228adad1f9e8633ee8',
    secret: '0e9481046a5c7588599d',
    cluster: 'ap1',
    useTLS: true,
  });

  app.use(cors());
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  //MEMRINTAHKAN DB UNTUK TERUS MEMERHATIKAN PERUBAHAN PADA COLLACTION CHAT
  const db = mongoose.connection;
  db.on('open', () => {
    console.log('db connection');

    const chatCollection = db.collection('chats');
    const changeStream = chatCollection.watch();

    changeStream.on('change', (change) => {
      console.log(change);

      if (change.operationType === 'insert') {
        const chat = change.fullDocument;
        pusher.trigger('messages', 'inserted', {
          username: chat.username,
          msg: chat.msg,
          received: chat.received,
          createAt: chat.createdAt,
        });
      }
    });
  });
};
module.exports = middleware;
