/* eslint-disable no-console */
const express = require('express');

const Router = express.Router();
const url = require('url');

const { validateUser } = require('../Utils/passport');
const Landlord = require('../Users/Landlord');

Router.post('/addListing', validateUser, async (req, res) => {
  console.log('Add new Listing');
  let results = null;
  const landlord = new Landlord();
  results = await landlord.addListing(req.body, res);
  return results;
});

Router.post('/updateListing', validateUser, async (req, res) => {
  console.log('Update new Listing');
  let results = null;
  const landlord = new Landlord();
  results = await landlord.updateListing(req.body, res);
  return results;
});

module.exports = Router;
