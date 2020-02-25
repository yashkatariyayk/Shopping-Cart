const express = require("express");
const app = express();
const productRoute = express.Router();
const mongoose = require('mongoose');
const multer = require('multer'); 

const storage = multer.diskStorage({
  
  destination: (req, file, cb) => {
      cb(null, './upload');
  },
  filename: (re, file, cb) => {

    const fileName = file.originalname.toLowerCase().split(' ').join('-')
      //cb(null, Date.now()  + file.originalname);     
      cb(null,fileName) 
  }
});         
//start saving picture
//var upload = multer({storage: storage});
// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
  function(req, res) {
    // resize image
    sharp(newPath).resize(100, 100).toFile(newPath, function(err) {
       if (err) {
         throw err;
       }
       
       res.json(newPath);
    });
  }
});


let productModel = require('../model/productmodel');

// To Add New product
productRoute.route("/addproduct").post(upload.single('Image'),function(req, res) {

  const url = req.protocol + '://' + req.get('host')

   const product = new productModel({
    _id: new mongoose.Types.ObjectId(),
     Image: url + '/upload/' + req.file.filename,
     Name : req.body.Name,
     Price : req.body.Price,
     Quantity : req.body.Quantity
  }); 

  product.save().then((result) => {
    console.log(result);
      res.status(200).json({ 
        product: "product Added Successfully",
      });
    })
    .catch(err => {

      res.status(400).send("Something Went Wrong");
    });
});


// To Get List Of product
productRoute.route("/").get(function(req, res) {
  productModel.find(function(err, product) {
    if (err) {
      console.log(err);
    } else {
      res.json(product);
    }
  });
});


// To Get product Details By product ID
productRoute.route("/").get(function(req, res) {
  let id = req.params.id;
  productModel.findById(id, function(err, product) {
    res.json(product);
  });
});

// Defined edit route
productRoute.route("/edit/:id").get(function(req, res) {
  let id = req.params.id;
  productModel.findById(id, function(err, product) {
    res.json(product);
  });
});

// To Update The product Details
productRoute.route("/update/:id").post(function(req, res,next) {
 
  productModel.findById(req.params.id, function(err, product) {
   // let product = new productModel(req.body);
    if (!product) return next(new Error("Unable To Find product With This Id"));
    else {
      console.log(product);
      console.log(req.body);
      product.Name = req.body.Name;
      product.Price = req.body.Price;
      product.Quantity = req.body.Quantity;    

      product
        .save()
        .then(product => {
          res.json({product:"product Updated Successfully"});
        })
        .catch(err => {
          res.status(400).send("Unable To Update product");
        });
        res.send(product);
    }
  });
});

// To Delete The product
productRoute.route("/delete/:id").get(function(req, res) {
  productModel.findByIdAndRemove({ _id: req.params.id }, function(
    err,
    product
  ) {
    if (err) res.json(err);

    else res.json("product Deleted Successfully");
  });
});

module.exports = productRoute;
