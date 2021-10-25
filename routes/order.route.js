const express = require("express");
const router = express.Router();

const OrderController = require("../app/controllers/order.controller");

router.get("/list", OrderController.list);
// router.post("/create", OrderController.create);
router.get("/:_id", OrderController.detail);
router.put("/:_id", OrderController.update);
router.delete("/:_id", OrderController.delete);

module.exports = router;
