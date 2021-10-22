const express = require("express");
const router = express.Router();

const UserController = require("../app/controllers/user.controller");
const ProductController = require("../app/controllers/product.controller");
const OrderController = require("../app/controllers/order.controller");

router.get("/user", UserController.loggedIn);
router.get("/products/list", ProductController.list);
router.post("/orders/checkout", OrderController.checkout);
router.get("/orders/history", OrderController.history);

module.exports = router;
