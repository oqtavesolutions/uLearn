const Course = require("../models/Course");

module.exports = {
  create: async ({
    course_title,
    course_description,
    course_slug,
    user_id,
    course_categories,
  }) => {
    try {
      const course = new Course({
        course_title,
        course_description,
        course_slug,
        course_categories,
        user_id,
      });
      return await course.save();
    } catch (error) {
      throw error;
    }
  },
};
