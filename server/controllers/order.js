const courseServices = require("../services/course");
const orderServices = require("../services/order");

module.exports = {
  findAllCourses: async (req, res) => {
    try {
      const orders = await orderServices.findAllCourses({
        user_id: req.user.id,
      });

      if (!orders) {
        return res.status(200).json([]);
      }

      return res.status(200).json(orders);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        statusCode: 400,
        error: error.message,
        messasge: "operation failed",
      });
    }
  },
  create: async (req, res) => {
    try {
      const course = await courseServices.findBySlug({
        course_slug: req.params.courseSlug,
      });

      const order = await orderServices.find({
        user_id: req.user.id,
        course_id: course.id,
      });

      if (order)
        return res.status(200).json({ message: "order already exists" });

      await orderServices.create({
        user_id: req.user.id,
        course_id: course.id,
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
