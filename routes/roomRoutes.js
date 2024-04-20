const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");
const userJwt = require("../middlewares/userJwt");

// Define routes

router.post("/", userJwt, roomController.createRoom);
router.get("/", userJwt, roomController.getRooms);
router.put("/:id", userJwt, roomController.updateRoom);
router.delete("/:id", userJwt, roomController.deleteRoom);

module.exports = router;
