const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    catagory: {
      type:mongoose.ObjectId,
      ref: "catagory",
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const ProductModel =  mongoose.model("products", productSchema);

module.exports={ProductModel}