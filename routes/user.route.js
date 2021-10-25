const express = require("express");
const router = express.Router();

const UserController = require("../app/controllers/user.controller");

router.get("/list", UserController.list);
// router.post("/create", UserController.create);
router.get("/:_id", UserController.detail);
router.put("/:_id", UserController.update);
// router.delete("/:_id", UserController.delete);

module.exports = router;
