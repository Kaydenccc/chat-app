const mongoose = require('mongoose');

const connect = () => {
  return mongoose.connect(
    'mongodb://AnharF:kayden26@cluster0-shard-00-00.lcn65.mongodb.net:27017,cluster0-shard-00-01.lcn65.mongodb.net:27017,cluster0-shard-00-02.lcn65.mongodb.net:27017/?ssl=true&replicaSet=atlas-r6hpau-shard-0&authSource=admin&retryWrites=true&w=majority',
    { dbName: 'ChatApp' }
  );
};

module.exports = connect;
