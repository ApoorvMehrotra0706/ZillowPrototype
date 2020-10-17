/* eslint-disable no-underscore-dangle */
// This file contains the function definitions of  functionalities common to all the roles

const bcrypt = require('bcrypt');
const Signup = require('../Models/SignupModel');
const Users = require('../Models/UsersModel');

const signup = async (req, res) => {
  Signup.findOne({ EmailID: req.body.emailID, Role: req.body.Role }, async (error, result) => {
    if (error) {
      res.writeHead(500, {
        'Content-Type': 'text/plain',
      });
      res.end();
    }
    if (result) {
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.end('EmailID already in use for the same role');
    } else {
      const hashedPassword = await bcrypt.hash(req.body.Password, 10);
      const signupUser = new Signup({ ...req.body, Password: hashedPassword });
      // eslint-disable-next-line no-unused-vars
      signupUser.save((e, data) => {
        if (e) {
          res.writeHead(500, {
            'Content-Type': 'text/plain',
          });
          res.end();
        } else {
          const user = new Users({ ...req.body, UserID: data._id });
          // eslint-disable-next-line no-unused-vars
          user.save((e1, data1) => {
            if (e) {
              res.writeHead(500, {
                'Content-Type': 'text/plain',
              });
              res.end();
            } else {
              res.writeHead(200, {
                'Content-Type': 'text/plain',
              });
              res.end();
            }
          });
        }
      });
    }
  });
};

// Logout
const logout = async (req, res) => {
  req.logout();
  res.status(200).end('Logged out');
};

module.exports = {
  signup,
  logout,
};
