const Lecture = require("../models/Lecture");

module.exports = {
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
