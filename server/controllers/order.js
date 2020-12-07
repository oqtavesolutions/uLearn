const orderServices = require("../services/order");

module.exports = {
  create: async (req, res) => {
    try {
      const order = await orderServices.find({
        user_id: "54c53ff6-375e-11eb-a573-e82b1f1b2a80",
        course_id: "308eda52-383a-11eb-a573-e82b1f1b2a80",
      });

      if (order)
        return res.status(200).json({ message: "order already exists" });

      await orderServices.create({
        user_id: "54c53ff6-375e-11eb-a573-e82b1f1b2a80",
        course_id: "308eda52-383a-11eb-a573-e82b1f1b2a80",
      });

      return res.status(200).json({ message: "order created successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        statusCode: 400,
        error: error.message,
        messasge: "operation failed",
      });
    }
  },
};
