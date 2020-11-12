/* eslint-disable no-console */
const express = require('express');

const Router = express.Router();
const url = require('url');
const { validateUser } = require('../Utils/passport');
const Realtor = require('../Users/Realtor');

Router.post('/addListing', validateUser, async (req, res) => {
  console.log('Add new Listing');
  let results = null;
  const realtor = new Realtor();
  results = await realtor.addListing(req.body, res);
  return results;
});

Router.post('/updateListing', validateUser, async (req, res) => {
  console.log('Update new Listing');
  let results = null;
  const realtor = new Realtor();
  results = await realtor.updateListing(req.body, res);
  return results;
});

Router.get('/getListing', validateUser, async (req, res) => {
  console.log('Update new Listing');
  const { RealtorID } = url.parse(req.url, true).query;
  let results = null;
  const filter = { RealtorID };
  const realtor = new Realtor();
  results = await realtor.getListing(filter, res);
  return results;
});

Router.get('/getApplications', validateUser, async (req, res) => {
  console.log('Get All applications for particular listing');
  const { OwnerID, ListingID, Filter } = url.parse(req.url, true).query;

  let results = null;
  const filter = [{ OwnerID }, { ListingID }];
  const realtor = new Realtor();
  results = await realtor.getApplications(filter, Filter, res);
  return results;
});

module.exports = Router;
