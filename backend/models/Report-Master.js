const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema
let ReportMaster = new Schema(
  {
    opReportNo: {
      type: String,
    },
    reportPrefix: {
      type: String,
    },
  },
  {
    collection: "reportmaster",
    timestamps: true,
  }
);

module.exports = mongoose.model("ReportMaster", ReportMaster);
