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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});