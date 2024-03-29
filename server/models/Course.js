const db = require("../db");

const Course = db.model("Course", {
  tableName: "courses",
  requireFetch: true,
  users: function () {
    return this.belongsTo("User");
  },
  authors: function () {
    return this.belongsTo("Author");
  },
  lectures: function () {
    return this.hasMany("Lecture");
  },
  orders: function () {
    return this.hasMany("Order");
  },
});

module.exports = Course;
