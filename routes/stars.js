const express = require("express");
const router = express.Router();

const starsController = require("../controllers/stars");
const validation = require("../middleware/validate");

router.get("/", starsController.getAll);
router.get("/:id", starsController.getSingle);

router.post("/", validation.saveStar, starsController.createStar);

router.put("/:id", validation.saveStar, starsController.updateStar);

router.delete("/:id", starsController.deleteStar);

module.exports = router;
