const Course = require("../models/Course");

const createCourse = async (req, res) => {
  try {
    const course = new Course({
      course_title: req.body.course_title,
      course_description: req.body.course_description,
      course_slug: req.body.course_slug,
      course_categories: "IT & Software",
      user_id: "54c53ff6-375e-11eb-a573-e82b1f1b2a80",
    });
    await course.save();
    res.status(200).json({ message: "course created successfully" });
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
  createCourse,
};
