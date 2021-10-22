// init express
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// mongoose connect
const database = require("./config/database");
database.connect();

// cors
const cors = require("cors");
app.use(cors());

/*
// flash
const flash = require("express-flash");
app.use(flash());

// override with POST having ?_method=DELETE
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// set the view engine to handlebar
const exphbs = require("express-handlebars");
const path = require("path");
app.engine(
  "hbs",
  exphbs({
    extname: ".hbs",
    helpers: require("./helpers/handlebars"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));


// passport local
const passportConfig = require("./config/passport");
passportConfig.initPassport();

// session
const session = require("express-session");
app.use(
  session({
    secret: "learnitsecret",
    resave: false,
    saveUninitialized: false,
  })
);
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});
*/

// route
const route = require("./routes");
route(app);

// setup public folder
app.use(express.static("public"));

// listen
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
