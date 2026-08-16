const express = require("express");
const app = express();
const cors = require("cors")
const bcrypt = require("bcrypt")
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes")
const taskRoutes = require("./routes/taskRoutes")

app.use(cors());
app.use(express.json());
app.use("/", authRoutes);
app.use("/",taskRoutes);
/*async function has(){
    const hash = await bcrypt.hash("160507",10)
    console.log("hased",hash)
}
has();*/





app.listen(5000, () => {
    console.log("server running on http://localhost:5000")
})