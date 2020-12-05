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

Router.get('/getListing', validateUser, async (req, res) => {
  console.log('Update new Listing');
  const { OwnerID } = url.parse(req.url, true).query;

  let results = null;
  const filter = { OwnerID };
  const landlord = new Landlord();
  results = await landlord.getListing(filter, res);
  return results;
});

Router.post('/deleteListing', validateUser, async (req, res) => {
  console.log('Delete Listing');
  const { OwnerID, ListingID } = req.body;
  let results = null;
  const filter = [{ OwnerID }, { _id: ListingID }];
  const landlord = new Landlord();
  results = await landlord.deleteListing(filter, res);
  return results;
});

Router.get('/getApplications', validateUser, async (req, res) => {
  console.log('Get All applications for particular listing');
  const { OwnerID, ListingID, Filter } = url.parse(req.url, true).query;

  let results = null;
  const filter = [{ OwnerID }, { ListingID }];
  const landlord = new Landlord();
  results = await landlord.getApplications(filter, Filter, res);
  return results;
});

Router.post('/processApplication', validateUser, async (req, res) => {
  console.log('Process application');
  let results = null;
  const { LandlordID, ApplicationID, ListingID, Status } = req.body;
  const filter = [{ OwnerID: LandlordID }, { ListingID }, { _id: ApplicationID }];
  const landlord = new Landlord();
  results = await landlord.processApplication(filter, Status, res);
  return results;
});

module.exports = Router;
