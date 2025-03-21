const express = require("express");
const router = express.Router();

const starsController = require("../controllers/stars");

router.get("/", starsController.getAll);
router.get("/:id", starsController.getSingle);

router.post("/", starsController.createStar);

router.put("/:id", starsController.updateStar);

router.delete("/:id", starsController.deleteStar);

module.exports = router;
