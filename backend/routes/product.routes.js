const express = require("express");
const app = express();
const productRoute = express.Router();

// Product model
let Product = require("../models/Product");

// Add Product
productRoute.route("/create").post((req, res, next) => {
  Product.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get All Product
productRoute.route("/").get((req, res) => {
  Product.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get single Product
productRoute.route("/read/:id").get((req, res) => {
  Product.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update Product
productRoute.route("/update/:id").put((req, res, next) => {
  Product.findByIdAndUpdate(
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

// Delete Product
productRoute.route("/delete/:id").delete((req, res, next) => {
  Product.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

//Search products
productRoute.route("/search").get((req, res, next) => {
  var regex = new RegExp(req.query["term"], "i");
  Product.find({ partNumber: regex }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json(data);
    }
  });
});

module.exports = productRoute;
