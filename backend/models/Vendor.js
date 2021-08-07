const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema
let Vendor = new Schema(
  {
    compName: {
      type: String,
    },
    type: {
      type: String,
    },
    othersType: {
      type: String,
    },
    gstNo: {
      type: String,
    },
    panNo: {
      type: String,
    },
    statusOfComp: {
      type: String,
    },
    address: {
      type: String,
    },
    mobileNumber: {
      type: Number,
    },
    phoneNumber: {
      type: Number,
    },
    contactPerson: {
      type: String,
    },
    email: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
  },
  {
    collection: "vendor",
    timestamps: true,
  }
);

module.exports = mongoose.model("Vendor", Vendor);
