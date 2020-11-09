/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

const User = require('./User.js');
const Listing = require('../Models/Listings');

class ListingPosters extends User {
  addListing(listing, response) {
    try {
      const newListing = new Listing({
        ...listing,
      });
      newListing.save((err, result) => {
        if (err) {
          response.writeHead(500, {
            'Content-Type': 'text/plain',
          });
          response.end('Network Error');
        } else {
          response.writeHead(201, {
            'Content-Type': 'text/plain',
          });
          response.end(JSON.stringify(result));
        }
      });
    } catch (error) {
      response.writeHead(500, {
        'Content-Type': 'text/plain',
      });
      response.end('Network error');
    }
    return response;
  }
}

module.exports = ListingPosters;
