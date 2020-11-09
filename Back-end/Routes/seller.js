/* eslint-disable no-console */
const express = require('express');

const Router = express.Router();
const { validateUser } = require('../Utils/passport');
const Seller = require('../Users/Seller');

Router.post('/addListing', validateUser, async (req, res) => {
  console.log('Add new Listing');
  let results = null;
  results = await Seller.addListing(req.body, res);
  return results;
});

module.exports = Router;
