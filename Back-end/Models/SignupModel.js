const mongoose = require('mongoose');

const { Schema } = mongoose;

const signupSchema = new Schema(
  {
    EmailID: { type: String, required: true },
    Password: { type: String, required: true },
    Role: { type: String, required: true },
    Status: {
      type: String,
      enum: ['Accepted', 'Pending'],
      required: true,
      default: 'Pending',
    },
  },
  { versionKey: false }
);

const SignupModel = mongoose.model('signup', signupSchema);
module.exports = SignupModel;
