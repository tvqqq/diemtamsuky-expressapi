const apiRouter = require("./api.route");
const adminRouter = require("./admin.route");
const JwtService = require("../app/services/jwt.service");
const Auth0Service = require("../app/services/auth0.service");
const UserController = require("../app/controllers/user.controller");

const route = (app) => {
  app.get("/", (req, res) => {
    res.status(200).send("<code>Hello from Điểm tâm Sú Ky Express API!</code>");
  });

  // API for Zalo Router
  app.post("/api/login", UserController.login);
  app.post("/api/login/callback", UserController.loginCallback);
  app.use("/api", JwtService.verify, apiRouter);

  // Admin Web router
  app.use("/admin", Auth0Service.verify, adminRouter);
};

module.exports = route;
