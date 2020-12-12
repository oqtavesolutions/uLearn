const lectureServices = require("../services/lecture");
const courseServices = require("../services/course");

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

  findByCourseAndLectureId: async (req, res) => {
    // we need to check if this lecture is part of that course
    try {
      const course = await courseServices.find({
        course_id: req.params.courseId,
      });

      if (!course)
        return res.status(400).json({
          statusCode: 400,
          error: "course not found",
          messasge: "operation failed",
        });

      const lecture = await lectureServices.find({
        lecture_id: req.params.lectureId,
      });

      if (!lecture)
        return res.status(400).json({
          statusCode: 400,
          error: "lecture not found",
          messasge: "operation failed",
        });

      if (lecture.attributes.course_id !== course.id)
        return res.status(400).json({
          statusCode: 400,
          error: "lecture does not belong to the course",
          messasge: "operation failed",
        });

      res.status(200).json(lecture);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        statusCode: 400,
        error: error.message,
        messasge: "operation failed",
      });
    }
  },

  findAllByCourse: async (req, res) => {
    try {
      const course = await courseServices.find({ course_id: req.params.id });

      const lectures = await lectureServices.findAllByCourse({
        course_id: course.id,
      });

      if (!lectures)
        return res.status(204).json({
          lectures: [],
          messasge: "No lectures created yet",
        });

      res.status(200).json(lectures);
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
      // this needs to find if the course exists first. if not then it should return an error.

      const course = await courseServices.find({ course_id: req.params.id });

      if (!course)
        return res.status(400).json({
          statusCode: 400,
          error: error.message,
          messasge: "operation failed",
        });

      await lectureServices.create({
        ...req.body,
        course_id: course.id,
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
      const course = await courseServices.find({
        course_id: req.params.courseId,
      });

      if (!course)
        return res.status(400).json({
          statusCode: 400,
          error: "course not found",
          messasge: "operation failed",
        });

      const lecture = await lectureServices.find({
        lecture_id: req.params.lectureId,
      });

      if (!lecture)
        return res.status(400).json({
          statusCode: 400,
          error: "lecture not found",
          messasge: "operation failed",
        });

      if (lecture.attributes.course_id !== course.id)
        return res.status(400).json({
          statusCode: 400,
          error: "lecture does not belong to the course",
          messasge: "operation failed",
        });

      const data = await lectureServices.update(lecture, {
        ...req.body,
      });
      return res.status(200).json({ ...data.attributes });
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
