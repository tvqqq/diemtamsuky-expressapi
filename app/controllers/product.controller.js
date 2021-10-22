// const {
//   multipleMongooseToObject,
//   mongooseToObject,
// } = require("../../helpers/mongoose");
const Product = require("../models/product.model");

class ProductController {
  // [GET] /list
  list(req, res, next) {
    Product.find({})
      .then((products) => {
        return res.send({
          error: 0,
          message: "Success",
          data: {
            products,
            cloudinaryUrl: process.env.CLOUDINARY_MENU_BASE_URL,
          },
        });
      })
      .catch(next);
  }

  // // [GET] /topics/add
  // add(req, res) {
  //   res.render("topics/add");
  // }

  // // [POST] /topics/add
  // create(req, res) {
  //   const data = {
  //     ...req.body,
  //     status: 0,
  //   };
  //   Topic.create(data);
  //   res.redirect("/topics");
  // }

  // // [GET] /topics/:_id
  // edit(req, res, next) {
  //   Topic.findById(req.params._id)
  //     .then((topic) => {
  //       res.render("topics/edit", { topic: mongooseToObject(topic) });
  //     })
  //     .catch(next);
  // }

  // // [PUT] /topics/:id
  // update(req, res, next) {
  //   Topic.updateOne({ _id: req.params._id }, req.body)
  //     .then(() => {
  //       res.redirect("/topics");
  //     })
  //     .catch(next);
  // }

  // // [DELETE] /topics/:id
  // delete(req, res, next) {
  //   Topic.deleteOne({ _id: req.params._id })
  //     .then(() => {
  //       res.redirect("/topics");
  //     })
  //     .catch(next);
  // }
}

module.exports = new ProductController();
