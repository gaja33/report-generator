const express = require("express");
const app = express();
const vendorRoute = express.Router();

// Vendor model
let Vendor = require("../models/Vendor");

// Add Vendor
vendorRoute.route("/create").post((req, res, next) => {
  Vendor.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get All Vendor
vendorRoute.route("/").get((req, res) => {
  Vendor.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get single Vendor
vendorRoute.route("/read/:id").get((req, res) => {
  Vendor.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update Vendor
vendorRoute.route("/update/:id").put((req, res, next) => {
  Vendor.findByIdAndUpdate(
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

// Delete Vendor
vendorRoute.route("/delete/:id").delete((req, res, next) => {
  Vendor.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = vendorRoute;
