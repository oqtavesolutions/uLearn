const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const PORT = process.env.PORT || process.env.API_PORT;

app.use(cors());

app.get("/", (_, res) => {
  res.status(404).json({
    statusCode: 404,
    error: "Not Found",
    messasge: "Not Found",
  });
});

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
