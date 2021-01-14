const Author = require("../models/Author");

module.exports = {
  find: async ({ user_id }) => {
    try {
      const author = await Author.where({
        user_id,
      }).fetch();
      return author;
    } catch (error) {
      throw error;
    }
  },
  findSingleBySlug: async ({ author_slug }) => {
    try {
      const author = await Author.where({ author_slug }).fetch();
      return author;
    } catch (error) {
      throw error;
    }
  },
  create: async ({
    user_id,
    author_name,
    author_bio,
    author_slug,
    profile_image_url,
  }) => {
    try {
      return await new Author({
        author_name,
        author_bio,
        author_slug,
        profile_image_url,
        user_id,
      }).save();
    } catch (error) {
      throw error;
    }
  },
  update: async (author, { author_name, author_bio, profile_image_url }) => {
    try {
      return await author.save({
        author_name,
        author_bio,
        profile_image_url,
      });
    } catch (error) {
      throw error;
    }
  },
};
