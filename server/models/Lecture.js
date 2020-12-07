const db = require("../db");

const Lecture = db.model("Lecture", {
  tableName: "lectures",
  users: function () {
    return this.belongsTo("courses");
  },
});

module.exports = Lecture;
