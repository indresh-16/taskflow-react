-- =========================================================
-- TaskFlow Database Backup: login_app
-- Compatible with Local MySQL & Railway MySQL (MySQL 8.0+)
-- =========================================================

-- Disable foreign key checks during import
SET FOREIGN_KEY_CHECKS = 0;

-- ---------------------------------------------------------
-- Table structure for table `users`
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password_hashed` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------
-- Table structure for table `tasks`
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tasks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(255) NOT NULL,
  `completed` TINYINT(1) NOT NULL DEFAULT 0,
  `user_id` INT NOT NULL,
  `priority` VARCHAR(50) NOT NULL DEFAULT 'Medium',
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_tasks_user_id` (`user_id`),
  CONSTRAINT `fk_tasks_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- =========================================================
-- Verification Queries:
-- SHOW TABLES;
-- DESCRIBE users;
-- DESCRIBE tasks;
-- =========================================================
