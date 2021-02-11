require('./models/User');
require('./models/Track');
require('./models/History');
require('./models/DeviceState');
require('./models/Param');
require('./middlewares/server');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const historyRouters = require('./routes/historyRouters');
const deviceRouters = require('./routes/deviceRouters');
const paramRouters = require('./routes/paramRouters');
const requireAuth = require('./middlewares/requireAuth');
var cors = require('cors')

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(authRoutes);
app.use(historyRouters);
app.use(deviceRouters);
app.use(paramRouters);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://admin:d52180362@cluster0.pdmvx.mongodb.net/<dbname>?retryWrites=true&w=majority';
if (!mongoUri) {
  throw new Error(
    `MongoURI was not supplied.  Make sure you watch the video on setting up Mongo DB!`
  );
}
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true
});
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});
mongoose.connection.on('error', err => {
  console.error('Error connecting to mongo', err);
});

app.get('/', requireAuth, (req, res) => {
  res.send(`Your username: ${req.user.username}`);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
