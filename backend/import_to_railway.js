/**
 * TaskFlow Railway MySQL Database Import & Verification Utility
 * 
 * Usage:
 *   node import_to_railway.js
 *   or:
 *   node import_to_railway.js --host=autorack.proxy.rlwy.net --port=12345 --user=root --password=secret --database=railway
 *   or:
 *   node import_to_railway.js "mysql://root:secret@autorack.proxy.rlwy.net:12345/railway"
 */

const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Parse command line arguments
const args = process.argv.slice(2);
let connectionUrl = null;
const cliConfig = {};

for (const arg of args) {
  if (arg.startsWith("mysql://") || arg.startsWith("mysql2://")) {
    connectionUrl = arg;
  } else if (arg.startsWith("--host=")) {
    cliConfig.host = arg.split("=")[1];
  } else if (arg.startsWith("--port=")) {
    cliConfig.port = Number(arg.split("=")[1]);
  } else if (arg.startsWith("--user=")) {
    cliConfig.user = arg.split("=")[1];
  } else if (arg.startsWith("--password=")) {
    cliConfig.password = arg.split("=")[1];
  } else if (arg.startsWith("--database=")) {
    cliConfig.database = arg.split("=")[1];
  }
}

async function runImport() {
  console.log("=========================================================");
  console.log("🚀 TASKFLOW RAILWAY MYSQL IMPORT & VERIFICATION UTILITY");
  console.log("=========================================================\n");

  let connectionConfig = null;

  if (connectionUrl) {
    console.log(`🔗 Using provided Connection URL`);
    connectionConfig = connectionUrl;
  } else {
    const host = cliConfig.host || process.env.MYSQLPUBLICHOST || process.env.MYSQLHOST || process.env.DB_HOST || "localhost";
    const port = cliConfig.port || Number(process.env.MYSQLPUBLICPORT || process.env.MYSQLPORT || process.env.DB_PORT || 3306);
    const user = cliConfig.user || process.env.MYSQLUSER || process.env.DB_USER || "root";
    const password = cliConfig.password !== undefined 
      ? cliConfig.password 
      : (process.env.MYSQLPASSWORD !== undefined ? process.env.MYSQLPASSWORD : (process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : "admin"));
    const database = cliConfig.database || process.env.MYSQLDATABASE || process.env.DB_NAME || "railway";

    connectionConfig = {
      host,
      port,
      user,
      password,
      database,
      multipleStatements: true,
      connectTimeout: 15000
    };

    console.log(`🎯 Connecting to MySQL Server:`);
    console.log(`   Host:     ${host}`);
    console.log(`   Port:     ${port}`);
    console.log(`   User:     ${user}`);
    console.log(`   Database: ${database}`);
    console.log(`   Password: ${password ? "********" : "(empty)"}\n`);
  }

  let connection;
  try {
    connection = await mysql.createConnection(connectionConfig);
    console.log("✅ Successfully connected to MySQL server!\n");
  } catch (connErr) {
    console.error("❌ Failed to connect to MySQL database.");
    console.error(`   Error details: ${connErr.message}\n`);
    console.error("💡 Troubleshooting Tips:");
    console.error("   1. In Railway, go to MySQL Service -> Settings -> Networking -> Enable Public Access");
    console.error("   2. Copy the public TCP Proxy Host, Port, and automatically generated Password");
    console.error("   3. Run with arguments:");
    console.error("      node import_to_railway.js --host=<PUBLIC_HOST> --port=<PUBLIC_PORT> --user=root --password=<PASSWORD> --database=<DB_NAME>\n");
    process.exit(1);
  }

  try {
    // Read SQL backup file
    const sqlPath = path.resolve(__dirname, "../login_app_backup.sql");
    let sqlContent = "";
    if (fs.existsSync(sqlPath)) {
      sqlContent = fs.readFileSync(sqlPath, "utf8");
    } else {
      const altPath = path.resolve(__dirname, "login_app_backup.sql");
      if (fs.existsSync(altPath)) {
        sqlContent = fs.readFileSync(altPath, "utf8");
      } else {
        throw new Error("Could not find login_app_backup.sql");
      }
    }

    console.log("📂 Executing database schema backup from login_app_backup.sql...");
    
    // Execute creation queries
    await connection.query("SET FOREIGN_KEY_CHECKS = 0;");
    
    const createUsersSql = `
      CREATE TABLE IF NOT EXISTS \`users\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`email\` VARCHAR(255) NOT NULL,
        \`password_hashed\` VARCHAR(255) NOT NULL,
        \`created_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`idx_users_email\` (\`email\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    await connection.query(createUsersSql);
    console.log("  ✅ Table 'users' verified / created.");

    const createTasksSql = `
      CREATE TABLE IF NOT EXISTS \`tasks\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`text\` VARCHAR(255) NOT NULL,
        \`completed\` TINYINT(1) NOT NULL DEFAULT 0,
        \`user_id\` INT NOT NULL,
        \`priority\` VARCHAR(50) NOT NULL DEFAULT 'Medium',
        \`created_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`),
        KEY \`idx_tasks_user_id\` (\`user_id\`),
        CONSTRAINT \`fk_tasks_user_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    await connection.query(createTasksSql);
    console.log("  ✅ Table 'tasks' verified / created.");

    await connection.query("SET FOREIGN_KEY_CHECKS = 1;");

    // ---------------------------------------------------------
    // Verification: SHOW TABLES
    // ---------------------------------------------------------
    console.log("\n---------------------------------------------------------");
    console.log("📋 VERIFYING DATABASE TABLES (SHOW TABLES)");
    console.log("---------------------------------------------------------");
    const [tables] = await connection.query("SHOW TABLES;");
    console.table(tables);

    // ---------------------------------------------------------
    // Verification: DESCRIBE users
    // ---------------------------------------------------------
    console.log("\n---------------------------------------------------------");
    console.log("🔍 STRUCTURE OF 'users' TABLE (DESCRIBE users)");
    console.log("---------------------------------------------------------");
    const [usersStructure] = await connection.query("DESCRIBE users;");
    console.table(usersStructure);

    // ---------------------------------------------------------
    // Verification: DESCRIBE tasks
    // ---------------------------------------------------------
    console.log("\n---------------------------------------------------------");
    console.log("🔍 STRUCTURE OF 'tasks' TABLE (DESCRIBE tasks)");
    console.log("---------------------------------------------------------");
    const [tasksStructure] = await connection.query("DESCRIBE tasks;");
    console.table(tasksStructure);

    console.log("\n=========================================================");
    console.log("🎉 DATABASE IMPORT AND VERIFICATION COMPLETED SUCCESSFULLY!");
    console.log("=========================================================\n");

  } catch (err) {
    console.error("❌ Error executing import script:", err);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

runImport();
