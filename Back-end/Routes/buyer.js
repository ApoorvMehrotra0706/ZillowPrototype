/* eslint-disable no-console */
const express = require('express');

const Router = express.Router();
const { validateUser } = require('../Utils/passport');
const Buyer = require('../Users/Buyer');

Router.post('/fileApplication', validateUser, async (req, res) => {
  console.log('fileApplication');
  let results = null;
  const buyer = new Buyer();
  results = await buyer.fileApplication(req.body, res);
  return results;
});

module.exports = Router;
