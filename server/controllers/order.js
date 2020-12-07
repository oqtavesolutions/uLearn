const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const order = new Order({
      user_id: "54c53ff6-375e-11eb-a573-e82b1f1b2a80",
      course_id: "308eda52-383a-11eb-a573-e82b1f1b2a80",
    });
    await order.save();
    res.status(200).json({ message: "order created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      statusCode: 400,
      error: error.message,
      messasge: "operation failed",
    });
  }
};

module.exports = {
  createOrder,
};
