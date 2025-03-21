const express = require("express");
const router = express.Router();

const planetsController = require("../controllers/planets");

router.get("/", planetsController.getAll);
router.get("/:id", planetsController.getSingle);

router.post("/", planetsController.createPlanet);

module.exports = router;
