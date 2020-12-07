const lectureServices = require("../services/lecture");
module.exports = {
  find: async (req, res) => {
    try {
      const lecture = await lectureServices.find({ id: req.params.id });
      if (!lecture)
        return res.status(400).json({
          statusCode: 400,
          error: error.message,
          messasge: "operation failed",
        });
      res.status(200).json(lecture);
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
      await lectureServices.create({
        ...req.body,
        course_id: "308eda52-383a-11eb-a573-e82b1f1b2a80",
      });
      return res.status(200).json({ message: "lecture created successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        statusCode: 400,
        error: error.message,
        messasge: "operation failed",
      });
    }
  },
  update: async (req, res) => {
    try {
      const lecture = await lectureServices.find({ id: req.params.id });
      if (!lecture)
        return res.status(400).json({
          statusCode: 400,
          error: error.message,
          messasge: "operation failed",
        });

      await lectureServices.update(lecture, {
        ...req.body,
      });
      return res.status(200).json({ message: "lecture updated successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        statusCode: 400,
        error: error.message,
        messasge: "operation failed",
      });
    }
  },
};
