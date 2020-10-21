const mongoose = require('mongoose');

const { Schema } = mongoose;

const realtorRelationSchema = new Schema(
  {
    RealtorID: { type: String, required: true },
    RealtorName: { type: String, required: true },
    OwnerID: { type: String, required: true },
    OwnerName: { type: String, required: true },
    Role: { type: String, enum: ['Buyer', 'Seller', 'Realtor'], required: true },
  },
  { versionKey: false }
);

const RealtorRelationModel = mongoose.model('realtorRelation', realtorRelationSchema);
module.exports = RealtorRelationModel;
