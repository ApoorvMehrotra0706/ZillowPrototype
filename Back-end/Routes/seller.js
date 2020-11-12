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

Router.get('/getListing', validateUser, async (req, res) => {
  console.log('Get all Listings');
  const { OwnerID } = url.parse(req.url, true).query;

  let results = null;
  const filter = { OwnerID };
  const seller = new Seller();
  results = await seller.getListing(filter, res);
  return results;
});

Router.get('/getApplications', validateUser, async (req, res) => {
  console.log('Get All applications for particular listing');
  const { OwnerID, ListingID, Filter } = url.parse(req.url, true).query;

  let results = null;
  const filter = [{ OwnerID }, { ListingID }];
  const seller = new Seller();
  results = await seller.getApplications(filter, Filter, res);
  return results;
});

module.exports = Router;
