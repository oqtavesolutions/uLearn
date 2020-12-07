const db = require("../db");

const Course = db.model("Course", {
  tableName: "courses",
  users: function () {
    return this.belongsTo("User");
  },
  lectures: function () {
    return this.hasMany("Lecture");
  },
  orders: function () {
    return this.hasMany("Order");
  },
});

module.exports = Course;
