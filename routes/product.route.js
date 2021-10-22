const express = require("express");
const router = express.Router();

const ProductController = require("../app/controllers/product.controller");

router.get("/list", ProductController.list);

// router.get("/", authMiddlware, TopicController.index);

// router.get("/add", TopicController.add);
// router.post("/add", TopicController.create);

// router.get("/:_id", TopicController.edit);
// router.put("/:_id", TopicController.update);

// router.delete("/:_id", TopicController.delete);

module.exports = router;
