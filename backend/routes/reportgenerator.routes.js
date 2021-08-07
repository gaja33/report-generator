const express = require("express");
const app = express();
const reportGeneratorRoute = express.Router();

// ReportGenerator model
let ReportGenerator = require("../models/Report-Generator");

// Add ReportGenerator
reportGeneratorRoute.route("/create").post((req, res, next) => {
  ReportGenerator.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get All ReportGenerator
reportGeneratorRoute.route("/").get((req, res) => {
  ReportGenerator.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get single ReportGenerator
reportGeneratorRoute.route("/read/:id").get((req, res) => {
  ReportGenerator.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update ReportGenerator
reportGeneratorRoute.route("/update/:id").put((req, res, next) => {
  ReportGenerator.findByIdAndUpdate(
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

// Delete ReportGenerator
reportGeneratorRoute.route("/delete/:id").delete((req, res, next) => {
  ReportGenerator.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = reportGeneratorRoute;
