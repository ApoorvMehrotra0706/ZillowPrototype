/* eslint-disable no-console */
const express = require('express');

const Router = express.Router();
const { validateUser } = require('../Utils/passport');
const Renter = require('../Users/Renter');

Router.post('/fileApplication', validateUser, async (req, res) => {
  console.log('fileApplication');
  let results = null;
  const renter = new Renter();
  results = await renter.fileApplication(req.body, res);
  return results;
});

module.exports = Router;
