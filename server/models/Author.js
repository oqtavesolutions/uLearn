const db = require("../db");

const Author = db.model("Author", {
  tableName: "authors",
  requireFetch: false,
  users: function () {
    return this.belongsTo("User");
  },
});

module.exports = Author;
