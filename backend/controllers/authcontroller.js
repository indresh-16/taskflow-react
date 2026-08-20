const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password_hashed);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
      );

      return res.status(200).json({
        message: "Login successful",
        token,
      });
    },
  );
}

async function register(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database Error" });
      }

      if (results.length > 0) {
        return res.status(409).json({ message: "User already registered" });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users (email, password_hashed) VALUES(?, ?)",
        [email, passwordHash],
        (insertErr) => {
          if (insertErr) {
            console.error(insertErr);
            return res.status(500).json({ message: "Failed to save user" });
          }

          return res.status(201).json({ message: "Registration successful" });
        },
      );
    },
  );
}

module.exports = {
  login,
  register,
};
