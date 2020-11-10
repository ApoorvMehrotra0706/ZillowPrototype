/* eslint-disable no-console */
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const commonPart = require('./Routes/headingRoutes');
const admin = require('./Routes/adminRoutes');
const { frontendURL, mongoDB } = require('./config');
const { auth } = require('./Utils/passport');

const app = express();

auth();
// use express session to maintain session data
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    duration: 60 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  })
);
// app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.array());
// eslint-disable-next-line func-names
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', frontendURL);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT,DELETE,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
// app.options('GET,HEAD,POST,PUT,DELETE,OPTIONS', cors());
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 500,
  bufferMaxEntries: 0,
};

// eslint-disable-next-line no-unused-vars
mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    console.log('MongoDB connection Failesd', err);
  } else {
    console.log('MongoDB Connected Succesfully');
  }
});

app.use('/housing', commonPart);

app.use('/admin', admin);

app.listen(3002);
