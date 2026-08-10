const express = require("express");
const app = express();
const cors = require("cors");


app.use(cors());
app.use(express.json());

app.post("/login",(req,res) => {
    const {email,password} = req.body;
    console.log("Email",email)
    console.log("password",password)

    res.json({
        message:"Login request received"
    });
})
.then(response => response.json())
.then(data => {
    console.log(data)
})

app.listen(5000,() =>{
    console.log("server running on http://localhost:5000")
})