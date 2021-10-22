const mongoose = require("mongoose");

const { Schema } = mongoose;

const Order = new Schema(
  {
    user: mongoose.Schema.Types.ObjectId,
    cart: Array,
    total: Number,
    name: String,
    phone: String,
    address: String,
    note: String,
    status: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", Order);
