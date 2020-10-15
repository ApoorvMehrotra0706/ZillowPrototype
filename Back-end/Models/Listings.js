const mongoose = require("mongoose");

const { Schema } = mongoose;

const listingsSchema = new Schema(
  {
    ZIP: { type: Number, min: 10000, max: 99999, required: true },
    StreetAddress: { type: String, required: true },
    State: { type: String, required: true },
    Country: { type: String, required: true },
    OwnerID: { type: String, required: true },
    OwnerName: { type: String, required: true },
    Price: { type: Number, required: true },
    RealtorID: { type: String },
    RealtorName: { type: String },
    Area: { type: Number, required: true },
    NoOfBedrooms: { type: Number },
    NoOfBathrooms: { type: Number },
    FlooringType: { type: String, enum: ['Carpet', 'WoodenFlooring'] },
    HomeType: { type: String, enum: ['Apartment', 'Townhome', 'Attached Single Family Home', 'Detached'] },
    Parking: { type: String, enum: ['Open', 'Closed', 'No'] },
    Amenities: { type: String },
    LeaseTerms: { type: String },
    AvailabilityDate: { type: String },
    SecurityDeposit: { type: Number },
    YearBuilt: { type: Number },
    AvailableAs: { type: Number },
    OpenHouse: { type: String }
  },
  { versionKey: false }
);

const ListingsModel = mongoose.model('listing', listingsSchema);
module.exports = ListingsModel;
