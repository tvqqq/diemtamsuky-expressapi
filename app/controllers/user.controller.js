const User = require("../models/user.model");
const ZaloService = require("./../services/zalo.service");
const JwtService = require("../services/jwt.service");

class UserController {
  // [GET] /api/user
  loggedIn(req, res, next) {
    return res.send({ error: 0, message: "Success", data: req.user });
  }

  // [POST] /api/login
  async login(req, res, next) {
    try {
      // Check access token
      const accessToken = req.body.accessToken;
      if (!accessToken) {
        return res.send({ error: -1, message: "Invalid access token" });
      }

      // Parse zalo profile
      const { id, birthday, name, gender, picture } =
        await ZaloService.getZaloProfile(accessToken);
      let pictureUrl = picture;
      if (picture.data) {
        pictureUrl = picture.data.url;
      }
      let birthDate = null;
      if (birthday) {
        const parts = birthday.split("/");
        birthDate = new Date(parts[2], parts[1] - 1, parts[0]);
      }

      // Update user info into db
      let user = await User.updateOne(
        { zaloId: id },
        {
          birthday: birthDate,
          name,
          gender,
          picture: pictureUrl,
        },
        { upsert: true }
      );

      // Response the jwt
      if (user) {
        const jwt = JwtService.genJSONWebToken(id, 3600);
        return res.send({
          error: 0,
          message: "Success",
          data: { ...user, jwt },
        });
      }
    } catch (ex) {
      res.send({ error: -1, message: "Unknown exception" });
      throw new Error(ex);
    }
  }

  // [GET] /users/list
  list(req, res, next) {
    User.find({})
      .sort({ createdAt: -1 })
      .then((users) => {
        return res.send({
          error: 0,
          message: "Success",
          data: {
            users,
          },
        });
      })
      .catch(next);
  }

  // [GET] /users/:id
  detail(req, res, next) {
    User.findById(req.params._id)
      .then((user) => {
        return res.send({
          error: 0,
          message: "Success",
          data: {
            user,
          },
        });
      })
      .catch(next);
  }

  // [PUT] /users/:id
  update(req, res, next) {
    User.updateOne({ _id: req.params._id }, req.body)
      .then((user) => {
        return res.send({
          error: 0,
          message: "Success",
          data: {
            user,
          },
        });
      })
      .catch(next);
  }
}

module.exports = new UserController();
