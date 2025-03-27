const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/authenticate");

const planetsController = require("../controllers/planets");
const validation = require("../middleware/validate");

router.get("/", planetsController.getAll);
router.get("/:id", planetsController.getSingle);

router.post("/", validation.savePlanet, planetsController.createPlanet);

router.put("/:id", isAuthenticated, validation.savePlanet, planetsController.updatePlanet);

router.delete("/:id", isAuthenticated, planetsController.deletePlanet);

module.exports = router;
