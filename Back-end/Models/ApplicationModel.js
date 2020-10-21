const mongoose = require('mongoose');

const { Schema } = mongoose;

const applicationSchema = new Schema(
  {
    ListingID: { type: String, required: true },
    ApplicantID: { type: String, required: true },
    ApplicantName: { type: String, required: true },
    OwnerID: { type: String, required: true },
    // OwnerName: { type: String, required: true },
    RealtorID: { type: String },
    // RealtorName: { type: String },
    Status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'],
      required: true,
      default: 'Pending',
    },
    PriceQuoted: { type: Number, required: true },
    Message: { type: String },
    CreditScore: { type: Number },
    EmpInformation: { type: String },
  },
  { versionKey: false }
);

applicationSchema.index({ ApplicantID: 1, ListingID: 1 }, { unique: true });

const ApplicationModel = mongoose.model('application', applicationSchema);
module.exports = ApplicationModel;
