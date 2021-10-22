const apiRouter = require("./api.route");
const JwtService = require("../app/services/jwt.service");
const UserController = require("../app/controllers/user.controller");

const route = (app) => {
  // API for Zalo Router
  app.post("/api/login", UserController.login);
  app.use("/api", JwtService.verify, apiRouter);

  // Admin Web router
};

module.exports = route;
