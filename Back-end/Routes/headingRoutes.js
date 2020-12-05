/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');

const Router = express.Router();

const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const {
  signup,
  logout,
  login,
  staticFetch,
  staticInsert,
} = require('../Common/SharedFunctionalities');

const Listing = require('../Users/ListingPosters');

const { BUCKET_NAME } = process.env;
const s3Storage = new AWS.S3({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
});

const mult = multer({
  storage: multerS3({
    s3: s3Storage,
    bucket: BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    // eslint-disable-next-line func-names
    // eslint-disable-next-line object-shorthand
    key: function (req, file, cb) {
      const folderName = 'glassdoor-proj';
      cb(null, `${folderName}/${Date.now().toString()}/${file.originalname}`);
    },
  }),
});

const imageUpload = mult.array('file');

const uploadFile = async (req, res) => {
  try {
    imageUpload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.json({ status: 400, error: err.message });
      } else if (err) {
        res.json({ status: 400, error: err.message });
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        const result = req.files.map((a) => a.location);
        // res.end(req.file.location);
        res.end(JSON.stringify(result));
      }
    });
  } catch (error) {
    res.writeHead(401, {
      'Content-Type': 'text/plain',
    });
    res.end('Network Error');
  }
  return res;
};

const { validateUser } = require('../Utils/passport');
const User = require('../Users/User');

// Insert Static Data
Router.post('/staticInsert', async (req, res) => {
  console.log('Insert static data');
  let results = null;
  results = await staticInsert(req, res);
  return results;
});

// Insert Static Data
Router.get('/staticFetch', async (req, res) => {
  console.log('Fetch static data');
  let results = null;
  results = await staticFetch(res);
  return results;
});

// User Login
Router.post('/login', async (req, res) => {
  console.log('Login if correct credential');
  let results = null;
  results = await login(req, res);
  return results;
});

// Signup for the Restaurant
Router.post('/signup', async (req, res) => {
  const value = await signup(req, res);
  return value;
});

// Logout for the Restaurant
Router.post('/logout', async (req, res) => {
  const value = await logout(req, res);
  return value;
});

// Add favorite home for a user
Router.post('/addFavoriteHome', validateUser, async (req, res) => {
  const userObj = new User();
  const value = await userObj.addFavoriteHome(req, res);
  return value;
});

// Add favorite search for a user
Router.post('/addFavoriteSearch', validateUser, async (req, res) => {
  const userObj = new User();
  const value = await userObj.addFavoriteSearch(req, res);
  return value;
});

// Get favorite home of a user
Router.get('/getFavoriteHome', validateUser, async (req, res) => {
  const userObj = new User();
  const value = await userObj.getFavoriteHome(req, res);
  return value;
});

// Get favorite home of a user
Router.get('/getFavoriteSearch', validateUser, async (req, res) => {
  const userObj = new User();
  const value = await userObj.getFavoriteSearch(req, res);
  return value;
});

// Get favorite home of a user
Router.get('/searchListing', async (req, res) => {
  const userObj = new User();
  const value = await userObj.searchListing(req, res);
  return value;
});

Router.post('/uploadImage', async (req, res) => {
  const value = await uploadFile(req, res);
  return value;
});

Router.get('/getListingByID', async (req, res) => {
  const listingObj = new Listing();
  const value = await listingObj.getListingByID(req, res);
  return value;
});
module.exports = Router;
