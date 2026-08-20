const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use(cors());
app.use(express.json());
app.use("/", authRoutes);
app.use("/", taskRoutes);

app.listen(5000, () => {
  console.log("server running on http://localhost:5000");
});
