const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/user");
const authorRoutes = require("./routes/author");

dotenv.config();
const PORT = process.env.PORT || process.env.API_PORT;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.status(404).json({
    statusCode: 404,
    error: "Not Found",
    messasge: "Not Found",
  });
});

app.use("/user", userRoutes);
app.use("/author", authorRoutes);

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
