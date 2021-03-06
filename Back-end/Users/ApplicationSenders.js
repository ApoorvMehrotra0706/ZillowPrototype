/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

const nodemailer = require('nodemailer');
const User = require('./User.js');
const Applications = require('../Models/ApplicationModel');
const Listing = require('../Models/Listings');

const sendEmail = (sendTo) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cmpe202zillow',
      pass: 'Harrypotter1@',
    },
  });

  const mailOptions = {
    from: 'cmpe202zillow@gmail.com',
    to: sendTo,
    subject: 'Application for the Listing',
    text:
      'Dear User, You are being notified to have received an application for your listing. Please spare some time to llok into it -CMPE202Zillow',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
  console.log('email sent');
};

class ApplicationSenders extends User {
  fileApplication(application, response) {
    try {
      Listing.findOne({ _id: application.ListingID }, async (error, listing) => {
        if (error) {
          response.writeHead(500, {
            'Content-Type': 'text/plain',
          });
          response.end('Network Error');
        }
        if (listing) {
          const newApplication = new Applications({
            ...application,
          });
          newApplication.save((err, result) => {
            if (err) {
              if (err.code === 11000) {
                response.writeHead(404, {
                  'Content-Type': 'text/plain',
                });
                response.end('Application already filed');
              } else {
                response.writeHead(500, {
                  'Content-Type': 'text/plain',
                });
                response.end('Network Error');
              }
            } else {
              sendEmail(listing.EmailForApplication);
              response.writeHead(201, {
                'Content-Type': 'text/plain',
              });
              response.end(JSON.stringify(result));
            }
          });
        } else {
          response.writeHead(500, {
            'Content-Type': 'text/plain',
          });
          response.end('No Listing found with given id');
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

module.exports = ApplicationSenders;
