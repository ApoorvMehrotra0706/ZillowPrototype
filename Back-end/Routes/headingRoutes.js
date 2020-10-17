/* eslint-disable no-console */
const express = require('express');

const Router = express.Router();
const {
  signup,
  logout,
  login,
  staticFetch,
  staticInsert,
} = require('../Common/SharedFunctionalities');
const { validateUser } = require('../Utils/passport');

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

module.exports = Router;
