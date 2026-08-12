const express = require("express");
const app = express();
const cors = require("cors")
const bcrypt = require("bcrypt")

app.use(cors());
app.use(express.json());

const user = {
    email: "D@gmail.com",
    passwordHash: "$2b$10$BH8f6HTCcc/HfboE5BU3YurPyBfmo7yuq62F/.6PmAHCVBnvj/40W"
};
async function loginUser(password) {
    const isMatch = await bcrypt.compare(
        password,
        user.passwordHash
    );
    return isMatch;
}

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (email !== user.email) {
                console.log("❌ EMAIL FAILED");
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    console.log("✅ EMAIL MATCHED");
    console.log("USER:", user);
    console.log("HASH:", user.passwordHash);

    const isMatch = await loginUser(password);

    if (!isMatch) {
                console.log("❌ PASSWORD FAILED");

        return res.status(401).json({
            message: "Invalid email or password"
        });
    }
        console.log("✅ LOGIN SUCCESS");


    // successful login goes here
    res.status(200).json({
    message: "Login successful"
});
});



app.listen(5000,() =>{
    console.log("server running on http://localhost:5000")
})