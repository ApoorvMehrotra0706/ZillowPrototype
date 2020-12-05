const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    UserID: { type: String, required: true },
    Name: { type: String, required: true },
    DOB: { type: String },
    ImageURL: { type: String },
    Contact: { type: Number, min: 1000000000, max: 9999999999 },
    FavouriteHomes: [
      {
        ListingID: { type: String, required: true },
        ImageURL: [String],
        ZIP: { type: Number, min: 10000, max: 99999 },
        StreetAddress: { type: String },
        State: { type: String },
        Price: { type: Number },
        NoOfBedrooms: { type: Number },
        NoOfBathrooms: { type: Number },
        Area: { type: Number },
      },
    ],
    FavouriteSearches: [
      {
        SearchName: { type: String },
        ZIP: { type: Number, min: 10000, max: 99999 },
        StreetAddress: { type: String },
        MinPrice: { type: String },
        MaxPrice: { type: String },
        MinArea: { type: String },
        MaxArea: { type: String },
        NoOfBedrooms: { type: Number },
        NoOfBathrooms: { type: Number },
        FlooringType: { type: String },
        HomeType: {
          type: String,
        },
        Parking: { type: String },
        Amenities: { type: String },
        YearBuilt: { type: Number },
      },
    ],
  },
  { versionKey: false }
);

userSchema.index({ _id: 1, ' FavouriteHomes.ListingID': 1 }, { unique: true });

const UsersModel = mongoose.model('user', userSchema);
module.exports = UsersModel;
