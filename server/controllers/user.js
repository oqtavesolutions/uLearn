const User = require("../models/User");

const createNewUser = async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    res.status(200).json({ message: "user was created succesfully" });
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
  createNewUser,
};
