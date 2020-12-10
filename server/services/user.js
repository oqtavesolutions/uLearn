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
  findById: async ({ user_id }) => {
    try {
      const user = User.where({ user_id }).fetch();
      return user;
    } catch (error) {
      throw error;
    }
  },
  create: async ({ email, user_id }) => {
    try {
      const user = new User({
        email,
        user_id,
      });
      return await user.save(null, { method: "insert" });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
