const lectureServices = require("../services/lecture");
module.exports = {
  create: async (req, res) => {
    try {
      await lectureServices.create({
        ...req.body,
        course_id: "308eda52-383a-11eb-a573-e82b1f1b2a80",
      });
      res.status(200).json({ message: "lecture created successfully" });
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
