const apiRouter = require("./api.route");
const JwtService = require("../app/services/jwt.service");
const UserController = require("../app/controllers/user.controller");

const route = (app) => {
  app.get("/", (req, res) => {
    res.status(200).send("<code>Hello from Điểm tâm Sú Ky Express API!</code>");
  });

  // API for Zalo Router
  app.post("/api/login", UserController.login);
  app.use("/api", JwtService.verify, apiRouter);

  // Admin Web router
};

module.exports = route;
