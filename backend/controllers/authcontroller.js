const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../config/db");

const router = express.Router();



 async function login(req, res) {
    const { email, password } = req.body

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Database error"
                })
            }

            if (results.length === 0) {
                return res.status(401).json({
                    message: "Invalid email or password"
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
};

async function register(req, res)  {
    const { email, password } = req.body;
    console.log("eamil:", email);
    console.log("password:", password)
    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: "Database Error"
                });
            }

            if (results.length > 0) {
                return res.status(409).json({
                    message: "User already registered"
                });
            }

            const passwordHash = await bcrypt.hash(password, 10)
            console.log("password:", password)
            console.log("Password Hash:", passwordHash);

            db.query(
                "INSERT INTO users (email,password_hashed) VALUES(?,?)",
                [email, passwordHash],
                (err, results) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({
                            message: "Failed to connect"
                        });
                    }

                    return res.status(201).json({
                        message: "Registration successful"
                    });
                }

            )

        }

    )


}

module.exports = {
    login,
    register
};