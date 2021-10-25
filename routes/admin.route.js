const express = require("express");
const router = express.Router();

const productRouter = require("./product.route");
router.use("/products", productRouter);

const userRouter = require("./user.route");
router.use("/users", userRouter);

const orderRouter = require("./order.route");
router.use("/orders", orderRouter);

module.exports = router;
