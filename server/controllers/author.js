const authorServices = require("../services/author");

module.exports = {
  find: async (req, res) => {
    try {
      const author = await authorServices.find({ user_id: req.user.id });
      console.log("what", author);
      if (!author) {
        return res.status(200).json({
          author_name: "",
          author_bio: "",
          author_slug: "",
        });
      }
      return res.status(200).json(author);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        statusCode: 400,
        error: error.message,
        messasge: "operation failed",
      });
    }
  },
  createUpdate: async (req, res) => {
    try {
      const findAuthor = await authorServices.find({
        user_id: req.user.id,
      });
      if (!findAuthor) {
        const author = await authorServices.create({
          user_id: req.user.id,
          ...req.body,
        });
        return res.status(200).json(author);
      }
      const author = await authorServices.update({ author, ...req.body });
      return res.status(200).json(author);
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
