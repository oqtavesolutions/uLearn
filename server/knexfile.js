const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  client: "mysql",
  connection: {
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_URL,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    charset: "utf8",
  },
};
