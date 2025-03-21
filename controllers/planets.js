const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //swagger.tags=["Planets"]
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("planets")
      .find();
    result.toArray().then((planets) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(planets);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSingle = async (req, res) => {
  //swagger.tags=["Planets"]
  try {
    const planetId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("planets")
      .find({ _id: planetId });
    result.toArray().then((planets) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(planets[0]);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createPlanet = async (req, res) => {
  //swagger.tags=["Planets"]
  const planet = {
    name: req.body.name,
    orderFromSun: req.body.orderFromSun,
    hasRings: req.body.hasRings,
    mainAtmosphere: req.body.mainAtmosphere,
    surfaceTempMinC: req.body.surfaceTempMinC,
    surfaceTempMaxC: req.body.surfaceTempMaxC,
    surfaceTempMeanC: req.body.surfaceTempMeanC,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("planets")
    .insertOne(planet);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error ocurred while creating the planet.");
  }
};

const updatePlanet = async (req, res) => {
  //swagger.tags=["Planets"]
  const planetId = new ObjectId(req.params.id);
  const planet = {
    name: req.body.name,
    orderFromSun: req.body.orderFromSun,
    hasRings: req.body.hasRings,
    mainAtmosphere: req.body.mainAtmosphere,
    surfaceTempMinC: req.body.surfaceTempMinC,
    surfaceTempMaxC: req.body.surfaceTempMaxC,
    surfaceTempMeanC: req.body.surfaceTempMeanC,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("planets")
    .replaceOne({ _id: planetId }, planet);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error ocurred while updating the planet.");
  }
};

const deletePlanet = async (req, res) => {
  //swagger.tags=["Planets"]
  const planetId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("planets")
    .deleteOne({ _id: planetId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error ocurred while deleting the planet.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createPlanet,
  updatePlanet,
  deletePlanet,
};
