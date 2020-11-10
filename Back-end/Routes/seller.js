/* eslint-disable no-console */
const express = require('express');

const Router = express.Router();
const url = require('url');

const { validateUser } = require('../Utils/passport');
const Seller = require('../Users/Seller');

Router.post('/addListing', validateUser, async (req, res) => {
  console.log('Add new Listing');
  let results = null;
  const seller = new Seller();
  results = await seller.addListing(req.body, res);
  return results;
});

Router.post('/updateListing', validateUser, async (req, res) => {
  console.log('Update new Listing');
  let results = null;
  const seller = new Seller();
  results = await seller.updateListing(req.body, res);
  return results;
});

module.exports = Router;
