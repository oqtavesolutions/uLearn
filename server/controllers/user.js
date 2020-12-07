const userServices = require("../services/user");

module.exports = {
  create: async (req, res) => {
    try {
      await userServices.create(req.body);
      return res.status(200).json({ message: "user was created succesfully" });
    } catch (error) {
      return res.status(400).json({
        statusCode: 400,
        error: error.message,
        messasge: "operation failed",
      });
    }
  },
};
