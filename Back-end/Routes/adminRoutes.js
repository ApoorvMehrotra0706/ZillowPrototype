/* eslint-disable no-console */
const express = require('express');

const Router = express.Router();
// const { fetchSignup } = require('../Admin/adminFunctionalities.mjs');

const { validateUser } = require('../Utils/passport');
const Admin = require('../Admin/adminFunctionalities.js');

// Fetch the list of users from signup table
Router.get('/fetchSignup', validateUser, async (req, res) => {
  const adminObj = new Admin();
  const results = adminObj.fetchSignup(req, res);
  return results;
});

// Update the status of users from signup table
Router.post('/auditSignup', validateUser, async (req, res) => {
  const adminObj = new Admin();
  const results = adminObj.auditSignup(req, res);
  return results;
});

module.exports = Router;
