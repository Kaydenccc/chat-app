const mongoose = require('mongoose');

const ChatApp = new mongoose.Schema(
  {
    username: String,
    avatar: String,
    msg: String,
    received: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ! Model
const ChatModel = mongoose.model('chat', ChatApp);
module.exports = ChatModel;
