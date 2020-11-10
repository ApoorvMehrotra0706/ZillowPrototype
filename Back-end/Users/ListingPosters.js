/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

const User = require('./User.js');
const Listing = require('../Models/Listings');
const Applications = require('../Models/ApplicationModel');

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

  updateListing(listing, response) {
    try {
      const filter = [{ _id: listing._id }];
      if (listing.OwnerID && listing.OwnerID.length > 0) {
        filter.push({ OwnerID: listing.OwnerID });
      } else {
        filter.push({ RealtorID: listing.RealtorID });
      }

      Listing.updateOne({ $and: filter }, { ...listing }, async (error) => {
        if (error) {
          response.writeHead(500, {
            'Content-Type': 'text/plain',
          });
          response.end('Network Error');
        } else {
          response.writeHead(200, {
            'Content-Type': 'text/plain',
          });
          response.end('Updated Successfuly');
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
