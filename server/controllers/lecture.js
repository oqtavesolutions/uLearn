const Lecture = require("../models/Lecture");

const createLecture = async (req, res) => {
  try {
    const lecture = new Lecture({
      lecture_title: req.body.lecture_title,
      lecture_description: req.body.lecture_description,
      lecture_slug: req.body.lecture_slug,
      lecture_attachment: req.body.lecture_attachment || "",
      course_id: "308eda52-383a-11eb-a573-e82b1f1b2a80",
    });
    await lecture.save();
    res.status(200).json({ message: "lecture created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      statusCode: 400,
      error: error.message,
      messasge: "operation failed",
    });
  }
};

module.exports = {
  createLecture,
};
