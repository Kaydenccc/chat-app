const cors = require('cors');
const express = require('express');
const Pusher = require('pusher');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

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
  app.use('/images', express.static(path.join(__dirname, '../', 'images')));
  //COONFIGURASI MULTER
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images');
    },
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + '-' + file.originalname);
    },
  });
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  app.use(multer({ storage, fileFilter }).single('avatar'));
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
      } else if (change.operationType === 'delete') {
        console.log(change.documentKey._id);
        pusher.trigger('messages', 'deleted', {
          id: change.documentKey._id,
        });
      }
    });
  });
};
module.exports = middleware;
