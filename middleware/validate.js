const validator = require("../helpers/validate");

const savePlanet = (req, res, next) => {
  const validationRule = {
    name: "required|string",
    orderFromSun: "required|numeric",
    hasRings: "required|boolean",
    mainAtmosphere: "required|array",
    surfaceTempMinC: "numeric",
    surfaceTempMaxC: "numeric",
    surfaceTempMeanC: "numeric",
  };
  validator(req.body, validationRule, {}, (error, status) => {
    if (!status) {
      res.status(412).send({
        sucess: false,
        message: "validation failed",
        data: error,
      });
    } else {
      next();
    }
  });
};

const saveStar = (req, res, next) => {
  const validationRule = {
    name: "required|string",
    constellation: "required|string",
    designation: "required|string",
    description: "string",
  };
  validator(req.body, validationRule, {}, (error, status) => {
    if (!status) {
      res.status(412).send({
        sucess: false,
        message: "validation failed",
        data: error,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  savePlanet,
  saveStar,
};
