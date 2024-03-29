const Course = require("../models/Course");

module.exports = {
  find: async ({ course_id }) => {
    try {
      const course = await Course.where({ course_id }).fetch();
      return course;
    } catch (error) {
      throw error;
    }
  },

  findByPrimaryKey: async ({ id }) => {
    try {
      const course = await Course.where({ id }).fetchAll();
      return course;
    } catch (error) {
      throw error;
    }
  },

  findByPrimaryKeyWithLectures: async ({ id }) => {
    try {
      const course = await Course.where({ id }).fetch({
        withRelated: ["lectures"],
      });
      return course;
    } catch (error) {
      throw error;
    }
  },

  findAllNonAuth: async () => {
    try {
      const course = await Course.fetchAll({
        withRelated: ["authors"],
      });
      return course;
    } catch (error) {
      throw error;
    }
  },

  findByCategoryNonAuth: async (category) => {
    try {
      const courses = await Course.where({
        course_categories: category,
      }).fetchAll({
        withRelated: ["authors"],
      });
      return courses;
    } catch (error) {
      throw error;
    }
  },

  findBySlug: async ({ course_slug }) => {
    try {
      const course = await Course.where({ course_slug }).fetch({
        withRelated: ["lectures"],
      });
      return course;
    } catch (error) {
      throw error;
    }
  },
  findSingleBySlug: async ({ course_slug }) => {
    try {
      const course = await Course.where({ course_slug }).fetch();
      return course;
    } catch (error) {
      throw error;
    }
  },
  findAllByUser: async ({ user_id }) => {
    try {
      const course = await Course.where({ user_id }).fetchAll();
      return course;
    } catch (error) {
      throw error;
    }
  },
  update: async (
    course,
    { course_title, course_description, course_categories, course_image }
  ) => {
    try {
      return await course.save({
        course_title: course_title || course.course_title,
        course_description: course_description || course.course_description,
        course_categories: course_categories || course.course_categories,
        course_image: course_image || course.course_image,
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
    course_image,
    author_id,
  }) => {
    try {
      const course = new Course({
        course_title,
        course_description,
        course_slug,
        course_categories,
        user_id,
        author_id,
        course_image,
      });
      const data = await course.save(null, {
        method: "insert",
      });
      console.log(data);
      return data.attributes;
    } catch (error) {
      throw error;
    }
  },
};
