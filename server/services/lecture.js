const Lecture = require("../models/Lecture");

module.exports = {
  find: async ({ id }) => {
    try {
      const lecture = await Lecture.where({ id }).fetch();
      return lecture;
    } catch (error) {
      throw error;
    }
  },

  findAllByCourse: async ({ course_id }) => {
    try {
      const lectures = await Lecture.where({ course_id }).fetchAll();
      return lectures;
    } catch (error) {
      throw error;
    }
  },

  update: async (
    lecture,
    { lecture_title, lecture_description, lecture_attachment }
  ) => {
    try {
      return await lecture.save({
        lecture_title: lecture_title || lecture.lecture_title,
        lecture_description: lecture_description || lecture.lecture_description,
        lecture_attachment: lecture_attachment || lecture.lecture_attachment,
      });
    } catch (error) {
      throw error;
    }
  },
  create: async ({
    lecture_title,
    lecture_description,
    lecture_slug,
    lecture_attachment,
    course_id,
  }) => {
    try {
      const lecture = new Lecture({
        lecture_title,
        lecture_description,
        lecture_slug,
        lecture_attachment,
        course_id,
      });
      return await lecture.save();
    } catch (error) {
      throw error;
    }
  },
};
