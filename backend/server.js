const express = require('express');
const app = express();
const connect = require('./src/connect/connection');
const PORT = process.env.PORT || 5000;
const middleware = require('./middleware/middleware');
const router = require('./routes/routes');

//middleware
middleware(app);

// rute
app.use('/api/v1', router);

connect()
  .then((res) => {
    console.log('Connect to Database ChatApp');
    app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
  })
  .catch((err) => console.log(err));
