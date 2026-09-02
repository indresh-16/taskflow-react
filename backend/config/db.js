const mysql = require("mysql2");
require("dotenv").config();

const connectionConfig = process.env.DATABASE_URL || process.env.MYSQL_URL || {
    host: process.env.DB_HOST || process.env.MYSQLHOST || "localhost",
    port: Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306),
    user: process.env.DB_USER || process.env.MYSQLUSER || "root",
    password: process.env.DB_PASSWORD !== undefined 
        ? process.env.DB_PASSWORD 
        : (process.env.MYSQLPASSWORD !== undefined ? process.env.MYSQLPASSWORD : "admin"),
    database: process.env.DB_NAME || process.env.MYSQLDATABASE || "login_app"
};

const db = mysql.createConnection(connectionConfig);

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }

    console.log("Database connected successfully ✅");
});

module.exports = db;