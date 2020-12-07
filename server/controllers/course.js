const courseServices = require("../services/course");

module.exports = {
  create: async (req, res) => {
    try {
      await courseServices.create({
        ...req.body,
        course_categories: "IT & Software",
        user_id: "54c53ff6-375e-11eb-a573-e82b1f1b2a80",
      });
      res.status(200).json({ message: "course created successfully" });
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
