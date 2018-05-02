const mongoose = require("mongoose");
const { Schema } = mongoose;

const evidenceOfCitizenshipFormSchema = new Schema({
  fathersName: { type: String },
  fathersNationality: { type: String },
  fathersAddress: { type: String },
  mothersName: { type: String },
  mothersNationality: { type: String },
  mothersAdrress: { type: String },
  oldPassport: { type: Boolean },
  dateofIssue: { type: Date },
  placeOfIssue: { type: String }
});

module.exports = evidenceOfCitizenshipFormSchema;
