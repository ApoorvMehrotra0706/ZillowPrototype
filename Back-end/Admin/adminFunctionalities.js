/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
// This file contains the function definitions of  functionalities common to all the roles

const UserSignup = require('../Models/SignupModel');

class Admin {
  fetchSignup(req, res) {
    // eslint-disable-next-line prefer-const
    let { Status, _id } = req.query;
    let filterArray = [];
    switch (Status) {
      case 'All':
        filterArray = [{ Status: 'Accepted' }, { Status: 'Pending' }, { Status: 'Rejected' }];
        break;
      case 'Pending':
        filterArray = [{ Status: 'Pending' }];
        break;
      case 'Accepted':
        filterArray = [{ Status: 'Accepted' }];
        break;
      case 'Rejected':
        filterArray = [{ Status: 'Rejected' }];
        break;
      default:
        break;
    }

    try {
      UserSignup.find(
        { $and: [{ _id: { $ne: _id } }, { $or: filterArray }] },
        { Password: 0 },
        async (error, result) => {
          if (error) {
            res.writeHead(500, {
              'Content-Type': 'text/plain',
            });
            res.end('Network error');
          } else {
            res.writeHead(200, {
              'Content-Type': 'application/json',
            });
            res.end(JSON.stringify(result));
          }
        }
      );
    } catch (error) {
      res.writeHead(500, {
        'Content-Type': 'text/plain',
      });
      res.end('Signup list fetch failed');
    }
    return res;
  }

  auditSignup(req, res) {
    // eslint-disable-next-line prefer-const
    try {
      UserSignup.find({ EmailID: req.body.EmailID, Role: req.body.Role }, async (error, result) => {
        if (error) {
          res.writeHead(500, {
            'Content-Type': 'text/plain',
          });
          res.end('Network error');
        } else {
          UserSignup.updateOne(
            { EmailID: req.body.EmailID, Role: req.body.Role },
            { Status: req.body.Status },
            async (error1, result1) => {
              if (error1) {
                res.writeHead(500, {
                  'Content-Type': 'text/plain',
                });
                res.end('Network error');
              } else {
                res.writeHead(200, {
                  'Content-Type': 'text/plain',
                });
                res.end('Update successful');
              }
            }
          );
        }
      });
    } catch (error) {
      res.writeHead(500, {
        'Content-Type': 'text/plain',
      });
      res.end('Network error');
    }
  }
}

module.exports = Admin;
