const express = require("express");
const router = express.Router();

const planetsController = require("../controllers/planets");

router.get("/", planetsController.getAll);
router.get("/:id", planetsController.getSingle);

router.post("/", planetsController.createPlanet);

router.put("/:id", planetsController.updatePlanet);

router.delete("/:id", planetsController.deletePlanet);

module.exports = router;
