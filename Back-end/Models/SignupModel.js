const mongoose = require('mongoose');

const { Schema } = mongoose;

const signupSchema = new Schema(
  {
    EmailID: { type: String, required: true },
    Password: { type: String, required: true },
    Name: { type: String, required: true },
    Role: {
      type: String,
      enum: ['Admin', 'Buyer', 'Seller', 'Renter', 'Landlord', 'Realtor'],
      required: true,
    },
    Status: {
      type: String,
      enum: ['Accepted', 'Pending', 'Rejected'],
      required: true,
      default: 'Pending',
    },
  },
  { versionKey: false }
);

const SignupModel = mongoose.model('signup', signupSchema);
module.exports = SignupModel;
