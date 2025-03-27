const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./data/database.js");
const app = express();
const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

const port = process.env.PORT || 4000;

app
  .use(bodyParser.json())
  .use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
    }),
  )
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Acesss-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    next();
  })
  .use(cors({ methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"] }))
  .use(cors({ origin: "*" }))
  .use("/", require("./routes"));

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (acessToken, refreshToken, profile, done) {
      //User.findOrCreate({ githubId: profile.id }, function(err, user)
      return done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

process.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}\n`,
  );
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () =>
      console.log(`Database is listening and node running on port ${port}`),
    );
  }
});
