const User = require("../models/User");

module.exports = {
  create: async ({ email, password }) => {
    try {
      const user = new User({
        email,
        password,
      });
      return await user.save();
    } catch (error) {
      throw error;
    }
  },
};
