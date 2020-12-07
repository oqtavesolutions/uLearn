const db = require("../db");

const User = db.model("User", {
  tableName: "users",
  authors: function () {
    return this.hasOne("Author");
  },
  courses: function () {
    return this.hasMany("Course");
  },
});

module.exports = User;
