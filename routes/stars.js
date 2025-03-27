const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/authenticate");

const starsController = require("../controllers/stars");
const validation = require("../middleware/validate");

router.get("/", starsController.getAll);
router.get("/:id", starsController.getSingle);

router.post("/", validation.saveStar, starsController.createStar);

router.put("/:id", isAuthenticated, validation.saveStar, starsController.updateStar);

router.delete("/:id", isAuthenticated, starsController.deleteStar);

module.exports = router;
