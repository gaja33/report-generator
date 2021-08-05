const express = require("express");
const app = express();
const metalRoute = express.Router();

// Metal model
let Metal = require("../models/Metal");

// Add Metal
metalRoute.route("/create").post((req, res, next) => {
  Metal.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get All Metal
metalRoute.route("/").get((req, res) => {
  Metal.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get single Metal
metalRoute.route("/read/:id").get((req, res) => {
  Metal.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update Metal
metalRoute.route("/update/:id").put((req, res, next) => {
  Metal.findByIdAndUpdate(
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

// Delete Metal
metalRoute.route("/delete/:id").delete((req, res, next) => {
  Metal.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = metalRoute;
