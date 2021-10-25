const express = require("express");
const router = express.Router();

const ProductController = require("../app/controllers/product.controller");

router.get("/list", ProductController.list);
router.post("/create", ProductController.create);
router.get("/:_id", ProductController.detail);
router.put("/:_id", ProductController.update);
router.delete("/:_id", ProductController.delete);

module.exports = router;
