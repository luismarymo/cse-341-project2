const express = require("express");
const router = express.Router();

const starsController = require("../controllers/stars");

router.get("/", starsController.getAll);
router.get("/:id", starsController.getSingle);

router.post("/", starsController.createStar);

module.exports = router;
