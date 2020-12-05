const mongoose = require('mongoose');

const { Schema } = mongoose;

const listingsSchema = new Schema(
  {
    ZIP: { type: Number, min: 10000, max: 99999, required: true },
    StreetAddress: { type: String, required: true },
    State: { type: String, required: true },
    Country: { type: String, required: true },
    OwnerID: { type: String },
    OwnerEmail: { type: String },
    OwnerName: { type: String },
    Price: { type: Number, required: true },
    RealtorID: { type: String },
    RealtorName: { type: String },
    Area: { type: Number, required: true },
    NoOfBedrooms: { type: Number },
    NoOfBathrooms: { type: Number },
    FlooringType: { type: String },
    HomeType: {type: String,},
    Parking: { type: String },
    Amenities: { type: String },
    LeaseTerms: { type: String },
    AvailabilityDate: { type: String },
    SecurityDeposit: { type: Number },
    YearBuilt: { type: Number },
    AvailableAs: { type: Number },
    OpenHouse: { type: String },
    EmailForApplication: { type: String },
    ImageURL: [String],
    Status: {
      type: String,
      enum: ['Available', 'Rent Out', 'Sold'],
      required: true,
      default: 'Available',
    },
  },
  { versionKey: false }
);
/** Add email to which applications should be sent, input while creating listing, also owner's email will be a field */

const ListingsModel = mongoose.model('listing', listingsSchema);
module.exports = ListingsModel;
