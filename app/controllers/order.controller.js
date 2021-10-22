// const {
//   multipleMongooseToObject,
//   mongooseToObject,
// } = require("../../helpers/mongoose");
const User = require("../models/user.model");
const Order = require("../models/order.model");

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

      // TODO: send message OA
      // const detail = cart
      //   .map((item) => `${item.quantity}x ${item.product.name}`)
      //   .join(", ");
      // const response = await ZaloService.sendMessage(
      //   req.user.followerId,
      //   `Cảm ơn bạn đã đặt hàng tại Coffee Shop. Chi tiết đơn hàng: ${detail}. Tổng cộng: ${total} VND`
      // );
      // console.log("[OA Message]", response);

      // TODO: alert admin about new order

      res.send({
        error: 0,
        message: "Đặt hàng thành công!",
        data: doc,
      });
    } catch (error) {
      res.send({ error: -1, message: "Unknown exception" });
      console.log("API-Exception", error);
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
      console.log("API-Exception", error);
    }
  }
}

module.exports = new OrderController();
