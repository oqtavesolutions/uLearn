const userServices = require("../services/user");
const authorServices = require("../services/author");

module.exports = {
  find: async (req, res) => {
    try {
      const user = await userServices.find({ email: req.query.email });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({
        statusCode: 400,
        error: error.message,
        messasge: "operation failed",
      });
    }
  },
  findById: async (req, res) => {
    try {
      const user = await userServices.findById({ user_id: req.users.user_id });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({
        statusCode: 400,
        error: error.message,
        messasge: "operation failed",
      });
    }
  },
  create: async (req, res) => {
    try {
      //console.log(req.user);
      const user = await userServices.create({
        email: req.user.email,
        user_id: req.user.uid,
      });
      await authorServices.create({
        user_id: user.id,
      });
      return res
        .status(200)
        .json({ message: "user was created succesfully", user });
    } catch (error) {
      return res.status(400).json({
        statusCode: 400,
        error: error.message,
        messasge: "operation failed",
      });
    }
  },
};
