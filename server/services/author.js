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
  create: async ({ user_id, author_name, author_bio, author_slug }) => {
    try {
      return await new Author({
        author_name,
        author_bio,
        author_slug,
        user_id,
      }).save();
    } catch (error) {
      throw error;
    }
  },
  update: async (author, { author_name, author_bio }) => {
    try {
      return await author.save({
        author_name,
        author_bio,
      });
    } catch (error) {
      throw error;
    }
  },
};
