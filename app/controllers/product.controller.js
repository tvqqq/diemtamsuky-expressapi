const Product = require("../models/product.model");

class ProductController {
  // [GET] /products/list ?admin=true
  list(req, res, next) {
    let condition = {};
    if (!req.query.admin) {
      condition = { status: true };
    }
    Product.find(condition)
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

  // [POST] /products/create
  create(req, res, next) {
    Product.create(req.body)
      .then((product) => {
        return res.send({
          error: 0,
          message: "Success",
          data: {
            product,
          },
        });
      })
      .catch(next);
  }

  // [GET] /products/:id
  detail(req, res, next) {
    Product.findById(req.params._id)
      .then((product) => {
        return res.send({
          error: 0,
          message: "Success",
          data: {
            product,
          },
        });
      })
      .catch(next);
  }

  // [PUT] /products/:id
  update(req, res, next) {
    Product.updateOne({ _id: req.params._id }, req.body)
      .then((product) => {
        return res.send({
          error: 0,
          message: "Success",
          data: {
            product,
          },
        });
      })
      .catch(next);
  }

  // [DELETE] /products/:id
  delete(req, res, next) {
    Product.deleteOne({ _id: req.params._id })
      .then(() => {
        return res.send({
          error: 0,
          message: "Success",
        });
      })
      .catch(next);
  }
}

module.exports = new ProductController();
