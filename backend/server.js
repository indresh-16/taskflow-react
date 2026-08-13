const express = require("express");
const app = express();
const cors = require("cors")
const bcrypt = require("bcrypt")
const db = require("./config/db");

app.use(cors());
app.use(express.json());

/*async function has(){
    const hash = await bcrypt.hash("12434",10)
    console.log("hased",hash)
}
has();*/
app.post("/login", async (req, res) => {
const { email, password } = req.body
    
    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err,results) =>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    message:"Database error"
                })
            }

            if(results.length === 0){
                return res.status(401).json({
                    message:"Invalid email or password"
                })
            }


        console.log("EMAIL FROM REQUEST:", email);
        console.log("PASSWORD FROM REQUEST:", password);
        console.log("USER FROM DATABASE:", results[0]);
        console.log("HASH FROM DATABASE:", results[0].password_hashed);

            const isMatch = await bcrypt.compare(
            password,
            results[0].password_hashed
            );
                    if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        return res.status(200).json({
            message: "Login successful"
        });

        })
        

});



app.listen(5000,() =>{
    console.log("server running on http://localhost:5000")
})