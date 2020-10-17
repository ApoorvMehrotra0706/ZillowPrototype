const express = require('express');

const Router = express.Router();
const { signup, logout } = require('../Common/SharedFunctionalities');

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

module.exports = Router;
