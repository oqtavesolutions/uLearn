const courseServices = require("../services/course");
const userServices = require("../services/user");
const orderServices = require("../services/order");
const authorServices = require("../services/author");
module.exports = {
  find: async (req, res) => {
    try {
      const course = await courseServices.find({ course_id: req.params.id });
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

  // this is for public
  findBySlug: async (req, res) => {
    try {
      const course = await courseServices.findBySlug({
        course_slug: req.params.courseSlug,
      });

      if (!course)
        return res.status(400).json({
          statusCode: 400,
          error: error.message,
          messasge: "operation failed",
        });

      const user = await userServices.findByPrimaryKey({
        id: course.attributes.user_id,
      });
      console.log(user);

      res.status(200).json({
        course,
        user_id: user.attributes.user_id,
        isOwner: false,
        isSubscribed: false,
      });
    } catch (error) {
      res.status(400).json({
        statusCode: 400,
        error: error.message,
        messasge: "operation failed",
      });
    }
  },

  // this happens for logged in user

  findBySlugAuth: async (req, res) => {
    try {
      const course = await courseServices.findBySlug({
        course_slug: req.params.courseSlug,
      });

      if (!course)
        return res.status(400).json({
          statusCode: 400,
          error: error.message,
          messasge: "operation failed",
        });

      const user = await userServices.findByPrimaryKey({
        id: course.attributes.user_id,
      });

      const author = await authorServices.find({ user_id: req.user.id });

      console.log("author", author);
      const isOwner = user.attributes.id === req.user.id;

      const order = await orderServices.find({
        user_id: req.user.id,
        course_id: course.attributes.id,
      });

      res.status(200).json({
        course,
        user_id: user.attributes.user_id,
        isOwner,
        isSubscribed: order ? true : false,
        author,
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
      const courses = await courseServices.findSingleBySlug({
        course_slug: req.params.courseSlug,
      });
      if (!courses)
        return res.status(400).json({
          statusCode: 400,
          error: error.message,
          messasge: "operation failed",
        });
      res.status(200).json(courses);
    } catch (error) {
      res.status(400).json({
        statusCode: 400,
        error: error.message,
        messasge: "operation failed",
      });
    }
  },

  findAllByUser: async (req, res) => {
    try {
      const courses = await courseServices.findAllByUser({
        user_id: req.user.id,
      });
      if (!courses)
        return res.status(400).json({
          statusCode: 400,
          error: error.message,
          messasge: "operation failed",
        });
      res.status(200).json(courses);
    } catch (error) {
      res.status(400).json({
        statusCode: 400,
        error: error.message,
        messasge: "operation failed",
      });
    }
  },

  findAllNonAuth: async (req, res) => {
    try {
      const courses = await courseServices.findAllNonAuth();
      if (!courses)
        return res.status(200).json({
          courses: [],
        });
      res.status(200).json(courses);
    } catch (error) {
      res.status(400).json({
        statusCode: 400,
        error: error.message,
        messasge: "operation failed",
      });
    }
  },
  findByCategoryNonAuth: async (req, res) => {
    try {
      const courses = await courseServices.findByCategoryNonAuth(
        req.params.category
      );
      console.log("why not you come?", courses);
      if (!courses)
        return res.status(200).json({
          courses: [],
        });
      // console.lo
      res.status(200).json(courses);
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
      const data = await courseServices.create({
        ...req.body,
        user_id: req.user.id,
      });
      res.status(200).json({ message: "course created successfully", data });
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
      const course = await courseServices.find({ course_id: req.params.id });
      if (!course)
        return res.status(400).json({
          statusCode: 400,
          error: error.message,
          messasge: "operation failed",
        });

      const updatedCourse = await courseServices.update(course, {
        ...req.body,
      });
      res.status(200).json({ ...updatedCourse.attributes });
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
