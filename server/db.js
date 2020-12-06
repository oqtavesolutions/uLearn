const knex = require("knex")(require("./knexfile"));
const db = require("bookshelf")(knex);
module.exports = db;
