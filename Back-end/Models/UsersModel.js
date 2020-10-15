const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    UserID: { type: String, required: true },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    DOB: { type: String, required: true },
    ImageURL: { type: String },
    Contact: { type: Number, required: true },
    FavouriteHomes: [
      {
        ListingID: { type: String, required: true },
        ImageURL: [String],
        ZIP: { type: Number, min: 10000, max: 99999, required: true },
        StreetAddress: { type: String },
        Price: { type: Number, required: true },
      },
    ],
    FavouriteSearches: [
      {
        ZIP: { type: Number, min: 10000, max: 99999 },
        StreetAddress: { type: String },
        PriceStartRange: { type: Number },
        PriceEndRange: { type: Number },
        Area: { type: Number },
        NoOfBedrooms: { type: Number },
        NoOfBathrooms: { type: Number },
        FlooringType: { type: String, enum: ["Carpet", "WoodenFlooring"] },
        HomeType: {
          type: String,
          enum: [
            "Apartment",
            "Townhome",
            "Attached Single Family Home",
            "Detached",
          ],
        },
        Parking: { type: String, enum: ["Open", "Closed", "No"] },
        Amenities: { type: String },
        YearBuilt: { type: Number },
      },
    ],
  },
  { versionKey: false }
);

// userSignupSchema.index({ Email: 1, Role: 1 }, { unique: true });

const UsersModel = mongoose.model("user", userSchema);
module.exports = UsersModel;
