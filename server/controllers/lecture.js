const lectureServices = require("../services/lecture");
const courseServices = require("../services/course");
const userServices = require("../services/user");

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

  findBySlugAuth: async (req, res) => {
    try {
      const lecture = await lectureServices.findBySlug({
        lecture_slug: req.params.lectureSlug,
      });

      if (!lecture)
        return res.status(400).json({
          statusCode: 400,
          error: error.message,
          messasge: "operation failed",
        });

      const course = await courseServices.findByPrimaryKeyWithLectures({
        id: lecture.attributes.course_id,
      });

      const user = await userServices.findByPrimaryKey({
        id: course.attributes.user_id,
      });

      const isOwner = user.attributes.id === req.user.id;

      if (isOwner) {
        return res.status(200).json({
          isSubcribed: true,
          course,
          lecture,
        });
      }

      const order = await orderServices.find({
        user_id: req.user.id,
        course_id: course.attributes.id,
      });

      if (!isOwner && !order) {
        res.status(400).json({
          statusCode: 400,
          error: error.message,
          messasge: "operation failed",
        });
      }

      // check if user owns the lecture or not. If not, show error

      res.status(200).json({
        isSubcribed: true,
        course,
        lecture,
      });
    } catch (error) {
      res.status(400).json({
        statusCode: 400,
        error: error.message,
        messasge: "operation failed",
      });
    }
  },

  findSingleBySlug: async (req, res) => {
    try {
      const lecture = await lectureServices.findSingleBySlug({
        lecture_slug: req.params.lectureSlug,
      });
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

      const data = await lectureServices.create({
        ...req.body,
        course_id: course.id,
      });

      return res.status(200).json({
        message: "lecture created successfully",
        lecture_id: data.attributes.lecture_id,
        course_id: course.attributes.course_id,
      });
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

      console.log({ ...req.body });
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
