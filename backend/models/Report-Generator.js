const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema
let ReportGenerator = new Schema(
  {
    reportNo: {
      type: String,
    },
    toAddress: {
      type: String,
    },
    skiDCNo: {
      type: String,
    },
    custDCNo: {
      type: String,
    },
    lotNo: {
      type: String,
    },
    remarks: {
      type: String,
    },
    parts: {
      type: Array,
    },
  },
  {
    collection: "reportgenerator",
  }
);

module.exports = mongoose.model("ReportGenerator", ReportGenerator);
