const db = require("../db");

const User = db.model("User", {
  tableName: "users",
  authors: function () {
    return this.hasOne("Author");
  },
  courses: function () {
    return this.hasMany("Course");
  },
  orders: function () {
    return this.hasMany("Order");
  },
});

module.exports = User;
