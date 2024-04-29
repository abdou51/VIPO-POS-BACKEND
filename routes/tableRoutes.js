const express = require("express");
const router = express.Router();
const tableController = require("../controllers/tableController");
const userJwt = require("../middlewares/userJwt");

// Define routes

router.post("/", userJwt, tableController.createTable);
router.get("/", userJwt, tableController.getTables);
router.put("/:id", userJwt, tableController.updateTable);
router.delete("/:id", userJwt, tableController.deleteTable);

module.exports = router;
