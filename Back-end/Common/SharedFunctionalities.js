/* eslint-disable no-underscore-dangle */
// This file contains the function definitions of  functionalities common to all the roles

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const UserSignup = require('../Models/SignupModel');
const StaticModel = require('../Models/StaticModel');
const Users = require('../Models/UsersModel');
const { auth } = require('../Utils/passport');

auth();

// Method to insert Static Data
const staticInsert = async (request, response) => {
  const staticData = new StaticModel({
    StateNames: request.body.StateNames,
    Country: request.body.Country,
    FlooringType: request.body.FlooringType,
    HomeType: request.body.HomeType,
    Status: request.body.Status,
    Role: request.body.Role,
    Parking: request.body.Parking,
  });
  staticData.save((error) => {
    if (error) {
      response.writeHead(500, {
        'Content-Type': 'text/plain',
      });
      response.end();
    } else {
      // console.log('data: ', data);
      response.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      response.end();
    }
  });
};

const staticFetch = async (response) => {
  try {
    StaticModel.find(await {}, async (error, result) => {
      if (error) {
        response.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        response.end('Network error');
      } else {
        response.writeHead(200, {
          'Content-Type': 'application/json',
        });
        response.end(JSON.stringify(result));
      }
    });
  } catch (error) {
    response.writeHead(500, {
      'Content-Type': 'text/plain',
    });
    response.end('Master Data Fetch Failed');
  }
  return response;
};

// Method for user login
const login = async (request, response) => {
  try {
    UserSignup.findOne(
      { EmailID: request.body.EmailID, Role: request.body.Role },
      async (error, user) => {
        if (error) {
          response.status(500).end('Error Occured');
        }
        if (user) {
          if (user.Status) {
            if (await bcrypt.compare(request.body.Password, user.Password)) {
              const payload = {
                _id: user._id,
                userrole: user.Role,
                email: user.EmailID,
                name: user.Name
              };
              const token = jwt.sign(payload, process.env.SESSION_SECRET, {
                expiresIn: 1008000,
              });
              response.status(200).end(`JWT ${token}`);
            } else {
              response.writeHead(401, {
                'Content-Type': 'text/plain',
              });
              response.status(401).end('Invalid Credentials Or Application has been Rejected');
            }
          } else {
            response.writeHead(202, {
              'Content-Type': 'text/plain',
            });
            response.status(202).end('Your application status is pending');
          }
        } else {
          response.writeHead(401, {
            'Content-Type': 'text/plain',
          });
          response.status(401).end('Invalid Credentials Or Application has been Rejected');
        }
      }
    );
  } catch (error) {
    response.writeHead(500, {
      'Content-Type': 'text/plain',
    });
    response.end('Network error');
  }
  return response;
};

const signup = async (req, res) => {
  try {
    UserSignup.findOne(
      { EmailID: req.body.emailID, Role: req.body.Role },
      async (error, result) => {
        if (error) {
          console.log(1);
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
          const signupUser = new UserSignup({
            EmailID: req.body.emailID,
            Password: hashedPassword,
            Role: req.body.Role,
            Name: req.body.Name,
          });
          // eslint-disable-next-line no-unused-vars
          signupUser.save((e, data) => {
            if (e) {
              console.log(2);
              res.writeHead(500, {
                'Content-Type': 'text/plain',
              });
              res.end('Network Error');
            } else {
              const user = new Users({ ...req.body, UserID: data._id });
              // eslint-disable-next-line no-unused-vars
              user.save((e1, data1) => {
                if (e1) {
                  console.log(3);
                  res.writeHead(500, {
                    'Content-Type': 'text/plain',
                  });
                  res.end('Network Error');
                } else {
                  res.writeHead(200, {
                    'Content-Type': 'text/plain',
                  });
                  res.end('Success');
                }
              });
            }
          });
        }
      }
    );
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'text/plain',
    });
    res.end('Network Error');
  }
};

// Logout
const logout = async (req, res) => {
  req.logout();
  res.status(200).end('Logged out');
};

module.exports = {
  signup,
  logout,
  login,
  staticInsert,
  staticFetch,
};
