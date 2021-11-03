const User = require("../models/user.model");
const Order = require("../models/order.model");
const axios = require("axios");
const ZaloService = require("./../services/zalo.service");

class OrderController {
  // [POST] /checkout
  async checkout(req, res, next) {
    try {
      const userId = req.user._id;
      const { cart = [], name, phone, address, note } = req.body;
      const total = cart.reduce((total, item) => total + item.subtotal, 0);
      const doc = await Order.create({
        user: userId,
        cart,
        total,
        name,
        phone,
        address,
        note,
      });

      // Update user information
      await User.updateOne(
        { _id: userId },
        {
          name,
          phone,
          address,
        },
        { upsert: true }
      );

      const detail = cart
        .map((item) => `${item.quantity}x ${item.product.name}`)
        .join(", ");
      const textAlert = `🚀 Có một đơn mới trên app Zalo!
      >> Chi tiết đơn hàng: ${detail}.
      >> Tổng cộng: ${total} VND
      >> Note: ${note}
      ---
      >> Thông tin người đặt: ${name} - ${phone} - ${address}
      `;

      // Send alert to Zalo admin
      try {
        await ZaloService.sendMessage(
          process.env.ZALO_ADMIN_FOLLOWER_ID,
          textAlert
        );
      } catch (error) {
        throw new Error(error);
      }

      // Send alert to Slack channel
      axios
        .post(process.env.SLACK_WEBHOOK_URL, {
          text: textAlert,
        })
        .then((res) => {})
        .catch((error) => {
          throw new Error(error);
        });

      res.send({
        error: 0,
        message: "Đặt hàng thành công!",
        data: doc,
      });
    } catch (error) {
      res.send({ error: -1, message: "Unknown exception" });
      throw new Error(error);
    }
  }

  // [GET] /history
  async history(req, res, next) {
    try {
      const userId = req.user._id;
      const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
      res.send({
        error: 0,
        message: "Success",
        data: orders,
      });
    } catch (error) {
      res.send({ error: -1, message: "Unknown exception" });
      throw new Error(error);
    }
  }

  // [GET] /orders/list
  list(req, res, next) {
    Order.find({})
      .sort({ createdAt: -1 })
      .then((orders) => {
        return res.send({
          error: 0,
          message: "Success",
          data: {
            orders,
          },
        });
      })
      .catch(next);
  }

  // [GET] /orders/:id
  detail(req, res, next) {
    Order.findById(req.params._id)
      .then((order) => {
        return res.send({
          error: 0,
          message: "Success",
          data: {
            order,
          },
        });
      })
      .catch(next);
  }

  // [PUT] /orders/:id
  update(req, res, next) {
    Order.updateOne({ _id: req.params._id }, req.body)
      .then((order) => {
        return res.send({
          error: 0,
          message: "Success",
          data: {
            order,
          },
        });
      })
      .catch(next);
  }

  // [DELETE] /orders/:id
  delete(req, res, next) {
    Order.deleteOne({ _id: req.params._id })
      .then(() => {
        return res.send({
          error: 0,
          message: "Success",
        });
      })
      .catch(next);
  }
}

module.exports = new OrderController();
