/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
// const Users = require('../Models/UsersModel');
const Users = require('../Models/UsersModel');

class User {
  addFavoriteHome(req, res) {
    // eslint-disable-next-line prefer-const
    try {
      const { UserID } = req.body;
      Users.findOne({ UserID }, async (err, data) => {
        if (err) {
          res.writeHead(500, {
            'Content-Type': 'text/plain',
          });
          res.end('Network error');
        }
        if (data) {
          Users.updateOne(
            { UserID },
            { $push: { FavouriteHomes: req.body.FavouriteHomes } },
            async (er, result) => {
              if (er) {
                res.writeHead(500, {
                  'Content-Type': 'text/plain',
                });
                res.end('Network error');
              }
              if (result) {
                res.writeHead(200, {
                  'Content-Type': 'text/plain',
                });
                res.end('Added the favorite home');
              } else {
                res.writeHead(400, {
                  'Content-Type': 'text/plain',
                });
                res.end('Addition of favorite home failed');
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

  addFavoriteSearch(req, res) {
    // eslint-disable-next-line prefer-const
    try {
      const { UserID } = req.body;
      Users.findOne({ UserID }, async (err, data) => {
        if (err) {
          res.writeHead(500, {
            'Content-Type': 'text/plain',
          });
          res.end('Network error');
        }
        if (data) {
          Users.updateOne(
            { UserID },
            { $push: { FavouriteSearches: req.body.FavouriteSearches } },
            async (er, result) => {
              if (er) {
                res.writeHead(500, {
                  'Content-Type': 'text/plain',
                });
                res.end('Network error');
              }
              if (result) {
                res.writeHead(200, {
                  'Content-Type': 'text/plain',
                });
                res.end('Added the search criteria');
              } else {
                res.writeHead(400, {
                  'Content-Type': 'text/plain',
                });
                res.end('Addition of favorite home failed');
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

module.exports = User;
