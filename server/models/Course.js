const db = require("../db");

const Course = db.model("Course", {
  tableName: "courses",
  users: function () {
    return this.belongsTo("users");
  },
  lectures: function () {
    return this.hasMany("lectures");
  },
});

module.exports = Course;
