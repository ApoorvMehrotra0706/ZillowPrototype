/* eslint-disable no-console */
const express = require('express');

const Router = express.Router();
const {
  signup,
  logout,
  login,
  staticFetch,
  staticInsert,
} = require('../Common/SharedFunctionalities');

const { validateUser } = require('../Utils/passport');
const User = require('../Users/User');

// Insert Static Data
Router.post('/staticInsert', async (req, res) => {
  console.log('Insert static data');
  let results = null;
  results = await staticInsert(req, res);
  return results;
});

// Insert Static Data
Router.get('/staticFetch', async (req, res) => {
  console.log('Fetch static data');
  let results = null;
  results = await staticFetch(res);
  return results;
});

// User Login
Router.post('/login', async (req, res) => {
  console.log('Login if correct credential');
  let results = null;
  results = await login(req, res);
  return results;
});

// Signup for the Restaurant
Router.post('/signup', async (req, res) => {
  const value = await signup(req, res);
  return value;
});

// Logout for the Restaurant
Router.post('/logout', async (req, res) => {
  const value = await logout(req, res);
  return value;
});

// Add favorite home for a user
Router.post('/addFavoriteHome', validateUser, async (req, res) => {
  const userObj = new User();
  const value = await userObj.addFavoriteHome(req, res);
  return value;
});

// Add favorite search for a user
Router.post('/addFavoriteSearch', validateUser, async (req, res) => {
  const userObj = new User();
  const value = await userObj.addFavoriteSearch(req, res);
  return value;
});

// Get favorite home of a user
Router.get('/getFavoriteHome', validateUser, async (req, res) => {
  const userObj = new User();
  const value = await userObj.getFavoriteHome(req, res);
  return value;
});

// Get favorite home of a user
Router.get('/getFavoriteSearch', validateUser, async (req, res) => {
  const userObj = new User();
  const value = await userObj.getFavoriteSearch(req, res);
  return value;
});

// Get favorite home of a user
Router.get('/searchListing', async (req, res) => {
  const userObj = new User();
  const value = await userObj.searchListing(req, res);
  return value;
});
module.exports = Router;
