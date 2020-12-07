const db = require("../db");

const Order = db.model("Order", {
  tableName: "orders",
  requireFetch: false,
  users: function () {
    return this.belongsTo("User");
  },
  courses: function () {
    return this.belongsTo("Course");
  },
});

module.exports = Order;
