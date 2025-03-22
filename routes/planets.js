const express = require("express");
const router = express.Router();

const planetsController = require("../controllers/planets");
const validation = require("../middleware/validate");

router.get("/", planetsController.getAll);
router.get("/:id", planetsController.getSingle);

router.post("/", validation.savePlanet, planetsController.createPlanet);

router.put("/:id", validation.savePlanet, planetsController.updatePlanet);

router.delete("/:id", planetsController.deletePlanet);

module.exports = router;
