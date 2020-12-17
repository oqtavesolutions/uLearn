const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/user");
const authorRoutes = require("./routes/author");
const courseRoutes = require("./routes/course");
const lectureRoutes = require("./routes/lecture");
const orderRoutes = require("./routes/order");

dotenv.config();
const PORT = process.env.PORT || process.env.API_PORT;
app.use(express.json());

const whitelist = ["http://localhost:3000", "https://ulearn.netlify.app"];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) return callback(null, true);

    callback(new Error("Not allowed by CORS"));
  },
};
app.use(cors(corsOptions));

app.get("/", (_, res) => {
  res.status(404).json({
    statusCode: 404,
    error: "Not Found",
    messasge: "Not Found",
  });
});

app.use("/user", userRoutes);
app.use("/author", authorRoutes);
app.use("/course", courseRoutes);
app.use("/lecture", lectureRoutes);
app.use("/order", orderRoutes);

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
