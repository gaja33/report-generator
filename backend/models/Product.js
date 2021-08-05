const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema
let Product = new Schema(
  {
    partNumber: {
      type: String,
    },
    partName: {
      type: String,
    },
    partDescription: {
      type: String,
    },
    weight: {
      type: String,
    },
    category: {
      type: String,
    },
    vendor: {
      type: String,
    },
    thickness: {
      type: Array,
    },
  },
  {
    collection: "product",
  }
);

module.exports = mongoose.model("Product", Product);
