const db = require("../db");

const Lecture = db.model("Lecture", {
  tableName: "lectures",
  courses: function () {
    return this.belongsTo("Course");
  },
});

module.exports = Lecture;
