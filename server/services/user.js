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
  create: async ({ email, id }) => {
    console.log(email, id);
    try {
      const user = new User({
        email,
        id,
      });
      return await user.save(null, { method: "insert" });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
