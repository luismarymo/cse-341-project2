const passport = require("passport");

const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  //swagger.tags=["=Welcome!"]
  const message = "Welcome to the Astronomical Bodies API | " +
  (req.session.user !== undefined 
    ? `Logged in as ${req.session.user.displayName}`
    : "Logged Out");
  res.send(message);
});

router.use("/planets", require("./planets"));
router.use("/stars", require("./stars"));

router.get("/login", passport.authenticate("github"), () => {});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  },
);

module.exports = router;
