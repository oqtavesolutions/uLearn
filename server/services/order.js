const Order = require("../models/Order");

module.exports = {
  find: async ({ user_id, course_id }) => {
    try {
      const order = await Order.where({
        user_id,
        course_id,
      }).fetch();
      return order;
    } catch (error) {
      throw error;
    }
  },

  findAllCourses: async ({ user_id }) => {
    try {
      const order = await Order.where({
        user_id,
      }).fetchAll({ withRelated: ["courses"] });
      return order;
    } catch (error) {
      throw error;
    }
  },

  create: async ({ user_id, course_id }) => {
    try {
      const order = new Order({
        user_id,
        course_id,
      });
      return await order.save();
    } catch (error) {
      throw error;
    }
  },
};
