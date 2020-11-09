/* eslint-disable no-console */
const express = require('express');

const Router = express.Router();
const { validateUser } = require('../Utils/passport');
const Realtor = require('../Users/Realtor');

Router.post('/addListing', validateUser, async (req, res) => {
  console.log('Add new Listing');
  let results = null;
  const realtor = new Realtor();
  results = await realtor.addListing(req.body, res);
  return results;
});

module.exports = Router;
