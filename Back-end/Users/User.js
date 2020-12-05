/* eslint-disable object-shorthand */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
// const Users = require('../Models/UsersModel');
const Users = require('../Models/UsersModel');
const Listings = require('../Models/Listings');

class User {
  NotExists(data, FavouriteHomes) {
    const fav = data.FavouriteHomes;
    let ret = true;
    fav.forEach(function (arrayItem) {
      if (arrayItem.ListingID === FavouriteHomes.ListingID) {
        ret = false;
      }
    });
    console.log(fav);
    return ret;
  }

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
          if (await this.NotExists(data, req.body.FavouriteHomes)) {
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

  getFavoriteHome(req, res) {
    try {
      const { UserID } = req.query;
      Users.findOne({ UserID }, { FavouriteHomes: 1 }, async (err, result) => {
        if (err) {
          res.writeHead(500, {
            'Content-Type': 'text/plain',
          });
          res.end('Network error');
        }
        if (result) {
          res.writeHead(200, {
            'Content-Type': 'text/plain',
          });
          res.end(JSON.stringify(result));
        } else {
          res.writeHead(400, {
            'Content-Type': 'text/plain',
          });
          res.end('Not found');
        }
      });
    } catch (error) {
      res.writeHead(500, {
        'Content-Type': 'text/plain',
      });
      res.end('Network error');
    }
  }

  getFavoriteSearch(req, res) {
    try {
      const { UserID } = req.query;
      Users.findOne({ UserID }, { FavouriteSearches: 1 }, async (err, result) => {
        if (err) {
          res.writeHead(500, {
            'Content-Type': 'text/plain',
          });
          res.end('Network error');
        }
        if (result) {
          res.writeHead(200, {
            'Content-Type': 'text/plain',
          });
          res.end(JSON.stringify(result));
        } else {
          res.writeHead(400, {
            'Content-Type': 'text/plain',
          });
          res.end('Not found');
        }
      });
    } catch (error) {
      res.writeHead(500, {
        'Content-Type': 'text/plain',
      });
      res.end('Network error');
    }
  }

  searchListing(req, res) {
    try {
      const {
        ZIP,
        StreetAddress,
        State,
        Country,
        MinArea,
        MaxArea,
        MinPrice,
        MaxPrice,
        NoOfBedrooms,
        NoOfBathrooms,
        FlooringType,
        HomeType,
        Parking,
        YearBuilt,
        AvailableAs,
      } = req.query;
      const filterArray = [];

      if (ZIP !== undefined && ZIP !== null && ZIP.length !== 0) {
        filterArray.push({ ZIP: ZIP });
      }
      if (StreetAddress !== undefined && StreetAddress !== null && StreetAddress.length !== 0) {
        filterArray.push({ StreetAddress: { $regex: `${StreetAddress}`, $options: 'i' } });
      }
      if (State !== undefined && State !== null && State.length !== 0) {
        filterArray.push({ State: State });
      }
      if (Country !== undefined && Country !== null && Country.length !== 0) {
        filterArray.push({ Country: Country });
      }
      if (MinArea !== undefined && MinArea !== null && MinArea.length !== 0) {
        filterArray.push({ Area: { $gt: MinArea } });
      }
      if (MaxArea !== undefined && MaxArea !== null && MaxArea.length !== 0) {
        filterArray.push({ Area: { $lt: MaxArea } });
      }
      if (MinPrice !== undefined && MinPrice !== null && MinPrice.length !== 0) {
        filterArray.push({ Price: { $gt: MinPrice } });
      }
      if (MaxPrice !== undefined && MaxPrice !== null && MaxPrice.length !== 0) {
        filterArray.push({ Price: { $lt: MaxPrice } });
      }
      if (NoOfBedrooms !== undefined && NoOfBedrooms !== null && NoOfBedrooms.length !== 0) {
        filterArray.push({ NoOfBedrooms: NoOfBedrooms });
      }
      if (NoOfBathrooms !== undefined && NoOfBathrooms !== null && NoOfBathrooms.length !== 0) {
        filterArray.push({ NoOfBathrooms: NoOfBathrooms });
      }
      if (FlooringType !== undefined && FlooringType !== null && FlooringType.length !== 0) {
        filterArray.push({ FlooringType: FlooringType });
      }
      if (HomeType !== undefined && HomeType !== null && HomeType.length !== 0) {
        filterArray.push({ HomeType: HomeType });
      }
      if (Parking !== undefined && Parking !== null && Parking.length !== 0) {
        filterArray.push({ Parking: Parking });
      }
      if (YearBuilt !== undefined && YearBuilt !== null && YearBuilt.length !== 0) {
        filterArray.push({ YearBuilt: YearBuilt });
      }
      if (AvailableAs !== undefined && AvailableAs !== null && AvailableAs.length !== 0) {
        filterArray.push({ AvailableAs: AvailableAs });
      }
      if (filterArray.length === 0) {
        Listings.find({}, async (err, result) => {
          if (err) {
            res.writeHead(500, {
              'Content-Type': 'text/plain',
            });
            res.end('Network error');
          }
          if (result) {
            res.writeHead(200, {
              'Content-Type': 'text/plain',
            });
            res.end(JSON.stringify(result));
          } else {
            res.writeHead(400, {
              'Content-Type': 'text/plain',
            });
            res.end('Not found');
          }
        });
      } else {
        Listings.find({ $and: filterArray }, async (err, result) => {
          if (err) {
            res.writeHead(500, {
              'Content-Type': 'text/plain',
            });
            res.end('Network error');
          }
          if (result) {
            res.writeHead(200, {
              'Content-Type': 'text/plain',
            });
            res.end(JSON.stringify(result));
          } else {
            res.writeHead(400, {
              'Content-Type': 'text/plain',
            });
            res.end('Not found');
          }
        });
      }
    } catch (error) {
      res.writeHead(500, {
        'Content-Type': 'text/plain',
      });
      res.end('Network error');
    }
  }
}

module.exports = User;
