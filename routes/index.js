const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  //swagger.tags=["=Welcome!"]
  res.send("Welcome to the Astronomical Bodies API");
});

router.use("/planets", require("./planets"));
router.use("/stars", require("./stars"));

module.exports = router;
