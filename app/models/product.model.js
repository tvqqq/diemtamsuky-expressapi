const mongoose = require("mongoose");

const { Schema } = mongoose;

const Product = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    image: String,
    price: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", Product);
