const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //swagger.tags=["Stars"]
  const result = await mongodb.getDatabase().db().collection("stars").find();
  result.toArray().then((stars) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(stars);
  });
};

const getSingle = async (req, res) => {
  //swagger.tags=["Stars"]
  const starId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("stars")
    .find({ _id: starId });
  result.toArray().then((stars) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(stars[0]);
  });
};

const createStar = async (req, res) => {
  //swagger.tags=["Stars"]
  const star = {
    name: req.body.name,
    constellation: req.body.constellation,
    designation: req.body.designation,
    description: req.body.description,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("stars")
    .insertOne(star);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error ocurred while creating the star.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createStar,
};
