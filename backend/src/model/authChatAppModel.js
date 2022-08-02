const mongoose = require('mongoose');
const AuthChatApp = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    avatar: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);
const AuthChatAppModel = mongoose.model('auth', AuthChatApp);
module.exports = AuthChatAppModel;
