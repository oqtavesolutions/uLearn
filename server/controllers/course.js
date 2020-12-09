const courseServices = require("../services/course");

module.exports = {
  find: async (req, res) => {
    try {
      const course = await courseServices.find({ id: req.params.id });
      console.log(course);
      if (!course)
        return res.status(400).json({
          statusCode: 400,
          error: error.message,
          messasge: "operation failed",
        });
      res.status(200).json(course);
    } catch (error) {
      res.status(400).json({
        statusCode: 400,
        error: error.message,
        messasge: "operation failed",
      });
    }
  },
  create: async (req, res) => {
    try {
      await courseServices.create({
        ...req.body,
        course_categories: "IT & Software",
        user_id: req.user.uid,
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
  update: async (req, res) => {
    try {
      const course = await courseServices.find({ id: req.params.id });
      if (!course)
        return res.status(400).json({
          statusCode: 400,
          error: error.message,
          messasge: "operation failed",
        });

      await courseServices.update(course, {
        ...req.body,
      });
      res.status(200).json({ message: "course updated successfully" });
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
