const User = require("../models/User");

module.exports = {
  find: async ({ email }) => {
    try {
      const user = User.where({ email }).fetch();
      return user;
    } catch (error) {
      throw error;
    }
  },
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
