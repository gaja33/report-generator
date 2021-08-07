const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema
let Metal = new Schema(
  {
    metalName: {
      type: String,
    },
    thickness: {
      type: String,
    },
  },
  {
    collection: "metal",
    timestamps: true,
  }
);

module.exports = mongoose.model("Metal", Metal);
