const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //swagger.tags=["Planets"]
  const result = await mongodb.getDatabase().db().collection("planets").find();
  result.toArray().then((planets) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(planets);
  });
};

const getSingle = async (req, res) => {
  //swagger.tags=["Planets"]
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
};

const createPlanet = async (req, res) => {
  //swagger.tags=["Planets"]
  const planet = {
    name: req.body.name,
    orderFromSun: req.body.orderFromSun,
    hasRings: req.body.hasRings,
    mainAtmosphere: req.body.mainAtmosphere,
    surfaceTemperatureC: {
      min: req.body.surfaceTemperatureC.min,
      max: req.body.surfaceTemperatureC.max,
      mean: req.body.surfaceTemperatureC.mean,
    },
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

module.exports = {
  getAll,
  getSingle,
  createPlanet,
};
