const express = require("express");
const { ProductModel } = require("../models/product.model");
const { validator, isAdmin } = require("../validatorM.D/valimiddleware");
const formidableMiddleware = require("express-formidable");

const fs = require("fs");

const productRoute = express.Router();

productRoute.post(
  "/addproduct",
  formidableMiddleware(),

  async (req, res) => {
    try {
      const { name, description, price, catagory, quantity, shipping } =
        req.fields;
      const { image } = req.files;

      //validation;

      switch (true) {
        case !name:
          return res.status(500).send({ name: "name is required" });
        case !description:
          return res.status(500).send({ name: "description is required" });
        case !price:
          return res.status(500).send({ name: "price is required" });
        case !catagory:
          return res.status(500).send({ catagory: "catagory is required" });
        case !quantity:
          return res.status(500).send({ quantity: "quantity is required" });
        case image && image.size > 100000:
          return res
            .status(500)
            .send({ image: "image is required and should be less than 1mb" });
      }
      let new_product = new ProductModel({ ...req.fields });
      if (image) {
        new_product.image.data = fs.readFileSync(image.path);
        new_product.image.contentType = image.type;
      }
      await new_product.save();
      res.status(201).send({ succ: "product saved success", new_product });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "cannot add product", error });
    }
  }
);

//get all the products;

productRoute.get("/getproducts", async (req, res) => {
  try {
    const products = await ProductModel.find({})
      .populate("catagory")
      .select("-image")
      .limit(12)
      .sort({ createdAt: -1 });
    res
      .status(200)
      .send({ succ: "all products", products, total: products.length });
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "cannot get products", error });
  }
});

//single Product getting;

productRoute.get("/singleproduct/:id", validator, async (req, res) => {
  try {
   

    let singleProduct = await ProductModel.findById({_id:req.params.id}).select('-image');
    console.log(singleProduct);

    res.send("ok");
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "cannot get single product", error });
  }
});

module.exports = {
  productRoute,
};
