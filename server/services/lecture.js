const Lecture = require("../models/Lecture");

module.exports = {
  find: async ({ lecture_id }) => {
    try {
      const lecture = await Lecture.where({ lecture_id }).fetch();
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

  findSingleBySlug: async ({ course_id, lecture_slug }) => {
    try {
      const lecture = await Lecture.where({ course_id, lecture_slug }).fetch();
      return lecture;
    } catch (error) {
      throw error;
    }
  },

  findBySlug: async ({ lecture_slug }) => {
    try {
      const lecture = await Lecture.where({ lecture_slug }).fetch();
      return lecture;
    } catch (error) {
      throw error;
    }
  },

  update: async (
    lecture,
    {
      lecture_title,
      lecture_description,
      lecture_attachment,
      lecture_content,
      lecture_google_slide,
      lecture_video_embed,
    }
  ) => {
    try {
      return await lecture.save({
        lecture_title: lecture_title || lecture.lecture_title,
        lecture_description: lecture_description || lecture.lecture_description,
        lecture_google_slide:
          lecture_google_slide || lecture.lecture_google_slide,
        lecture_content: lecture_content || lecture.lecture_content,
        lecture_video_embed: lecture_video_embed || lecture.lecture_video_embed,
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
    lecture_content,
    lecture_google_slide,
    lecture_video_embed,
    lecture_attachment,
    course_id,
  }) => {
    try {
      const lecture = new Lecture({
        lecture_title,
        lecture_description,
        lecture_slug,
        lecture_content,
        lecture_google_slide,
        lecture_video_embed,
        lecture_attachment,
        course_id,
      });
      return await lecture.save();
    } catch (error) {
      throw error;
    }
  },
};
