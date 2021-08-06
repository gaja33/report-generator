const express = require("express");
const app = express();
const reportMasterRoute = express.Router();

// ReportMaster model
let ReportMaster = require("../models/Report-Master");

// Add ReportMaster
reportMasterRoute.route("/create").post((req, res, next) => {
  ReportMaster.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get All ReportMaster
reportMasterRoute.route("/").get((req, res) => {
  ReportMaster.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get single ReportMaster
reportMasterRoute.route("/read/:id").get((req, res) => {
  ReportMaster.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update ReportMaster
reportMasterRoute.route("/update/:id").put((req, res, next) => {
  ReportMaster.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        res.json(data);
        console.log("Data updated successfully");
      }
    }
  );
});

// Delete ReportMaster
reportMasterRoute.route("/delete/:id").delete((req, res, next) => {
  ReportMaster.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = reportMasterRoute;
