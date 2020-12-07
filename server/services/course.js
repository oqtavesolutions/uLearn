const Course = require("../models/Course");

module.exports = {
  find: async ({ id }) => {
    try {
      const course = await Course.where({ id }).fetch();
      return course;
    } catch (error) {
      throw error;
    }
  },
  update: async (
    course,
    { course_title, course_description, course_categories }
  ) => {
    try {
      return await course.save({
        course_title: course_title || course.course_title,
        course_description: course_description || course.course_description,
        course_categories: course_categories || course.course_categories,
      });
    } catch (error) {
      throw error;
    }
  },
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
