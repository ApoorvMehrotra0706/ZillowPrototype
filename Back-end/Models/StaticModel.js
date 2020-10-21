const mongoose = require("mongoose");

const { Schema } = mongoose;

const staticSchema = new Schema(
  {
    StateNames: [String],
    Country: [String],
    FlooringType: [String],
    HomeType: [String],
    Status: [String],
    Role: [String],
    Parking: [String],
  },
  { versionKey: false }
);

// userSignupSchema.index({ Email: 1, Role: 1 }, { unique: true });

const StaticDataModel = mongoose.model("staticData", staticSchema);
module.exports = StaticDataModel;
