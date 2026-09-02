const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
app.get("/", (req, res) => {
  res.send("TaskFlow Backend is Running 🚀");
});
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    database: "connected"
  });
});

app.use(express.json());
app.use("/", authRoutes);
app.use("/", taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running successfully on port ${PORT}`);
});

