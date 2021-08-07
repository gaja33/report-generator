const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema
let Category = new Schema(
  {
    catName: {
      type: String,
    },
  },
  {
    collection: "category",
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", Category);
