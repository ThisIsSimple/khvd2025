-- KHVD 2025 Exhibition - Message Board Database Schema
-- MySQL Database Schema for Guestbook Messages

-- Create database (if needed)
-- CREATE DATABASE IF NOT EXISTS khvd_2025 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE khvd_2025;

-- ================================================================
-- Drop existing tables (in reverse dependency order)
-- ================================================================
DROP TABLE IF EXISTS `work_images`;
DROP TABLE IF EXISTS `work_designers`;
DROP TABLE IF EXISTS `designers`;
DROP TABLE IF EXISTS `works`;
DROP TABLE IF EXISTS `messages`;

-- ================================================================
-- Create tables
-- ================================================================

-- Create messages table (방명록 테이블)
CREATE TABLE IF NOT EXISTS `messages` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Primary key, auto-increment ID',
  `writer` VARCHAR(50) NOT NULL COMMENT 'Writer name (max 50 characters)',
  `password` VARCHAR(10) NOT NULL COMMENT 'Password for message edit/delete (max 10 characters)',
  `message` VARCHAR(200) NOT NULL COMMENT 'Message content (max 200 characters)',
  `type` VARCHAR(10) NULL DEFAULT NULL COMMENT 'Message type (optional, e.g., work, designer, normal)',
  `target_id` BIGINT NULL DEFAULT NULL COMMENT 'Target ID (work_id or designer_id, no foreign key constraint)',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  PRIMARY KEY (`id`),
  INDEX `idx_created_at` (`created_at` DESC) COMMENT 'Index for pagination queries',
  INDEX `idx_target_id` (`target_id`) COMMENT 'Index for target lookups',
  INDEX `idx_type_target` (`type`, `target_id`) COMMENT 'Composite index for filtering by type and target'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Guestbook messages table';


-- Grant permissions (adjust username as needed)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON khvd_2025.messages TO 'khvd_user'@'localhost';
-- FLUSH PRIVILEGES;

-- ================================================================
-- Exhibition Works & Designers Tables
-- ================================================================

-- Create works table (작품 테이블)
CREATE TABLE IF NOT EXISTS `works` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Primary key, auto-increment ID',
  `detail_thumbnail` TEXT NULL DEFAULT NULL COMMENT 'Detail page thumbnail image URL/path',
  `list_thumbnail` TEXT NULL DEFAULT NULL COMMENT 'List page thumbnail image URL/path',
  `title` TEXT NOT NULL COMMENT 'Work title',
  `description` TEXT NOT NULL COMMENT 'Short description of the work',
  `content` TEXT NOT NULL COMMENT 'Detailed content/explanation',
  `professor` TEXT NULL COMMENT 'Professor name(s)',
  `group_number` TINYINT NOT NULL COMMENT 'Group number (0-3 for GRADUATION STUDIES 0-3)',
  `student_id` VARCHAR(20) NULL DEFAULT NULL COMMENT 'Student ID number (학번)',
  `is_team_work` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Whether this is a team work or individual work',
  `qr_image` TEXT NULL DEFAULT NULL COMMENT 'Team work Instagram QR code image URL/path',
  `qr_link` TEXT NULL DEFAULT NULL COMMENT 'Team work Instagram QR code link',
  `pc_link` TEXT NULL DEFAULT NULL COMMENT 'PC version content link (YouTube embed or clickable image)',
  `mobile_link` TEXT NULL DEFAULT NULL COMMENT 'Mobile version content link (YouTube embed or clickable image)',
  `notes` TEXT NULL DEFAULT NULL COMMENT 'Additional notes (비고)',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  PRIMARY KEY (`id`),
  INDEX `idx_group_number` (`group_number`) COMMENT 'Index for filtering by group',
  INDEX `idx_is_team_work` (`is_team_work`) COMMENT 'Index for filtering by work type',
  CHECK (`group_number` >= 0 AND `group_number` <= 3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Exhibition works table';

-- Create work_images table (작품 이미지 테이블)
CREATE TABLE IF NOT EXISTS `work_images` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Primary key, auto-increment ID',
  `work_id` BIGINT NOT NULL COMMENT 'Associated work ID (no foreign key constraint)',
  `image` TEXT NOT NULL COMMENT 'Image URL/path',
  `link` TEXT NULL DEFAULT NULL COMMENT 'Optional external link',
  `platform` ENUM('pc', 'mobile') NOT NULL DEFAULT 'pc' COMMENT 'Platform type (pc or mobile)',
  `order` BIGINT NOT NULL DEFAULT 0 COMMENT 'Display order',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  PRIMARY KEY (`id`),
  INDEX `idx_work_id` (`work_id`) COMMENT 'Index for filtering by work',
  INDEX `idx_order` (`order`) COMMENT 'Index for sorting by order'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Work images table';

-- Create designers table (디자이너 테이블)
CREATE TABLE IF NOT EXISTS `designers` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Primary key, auto-increment ID',
  `name` TEXT NOT NULL COMMENT 'Korean name',
  `eng_name` TEXT NOT NULL COMMENT 'English name',
  `profile_image` TEXT NULL COMMENT 'Profile image URL/path',
  `introduction` TEXT NOT NULL COMMENT 'Self introduction',
  `interview1` TEXT NOT NULL COMMENT 'Interview question 1 answer',
  `interview2` TEXT NOT NULL COMMENT 'Interview question 2 answer',
  `email` TEXT NULL DEFAULT NULL COMMENT 'Email address (optional)',
  `instagram` TEXT NULL DEFAULT NULL COMMENT 'Instagram handle (optional)',
  `instagram_qr_image` TEXT NULL DEFAULT NULL COMMENT 'Instagram QR code image (optional)',
  `homepage` TEXT NULL DEFAULT NULL COMMENT 'Personal homepage URL (optional)',
  `qr_image` TEXT NULL DEFAULT NULL COMMENT 'QR code image URL/path (인스타 QR 이미지)',
  `qr_link` TEXT NULL DEFAULT NULL COMMENT 'QR code link URL (인스타 QR 링크)',
  `contact1_text` TEXT NULL DEFAULT NULL COMMENT 'Contact 1 display text (연락처1에 표시할 텍스트)',
  `contact1_url` TEXT NULL DEFAULT NULL COMMENT 'Contact 1 URL (연락처1에 연결할 URL)',
  `contact2_text` TEXT NULL DEFAULT NULL COMMENT 'Contact 2 display text (optional) (연락처2에 표시할 텍스트)',
  `contact2_url` TEXT NULL DEFAULT NULL COMMENT 'Contact 2 URL (optional) (연락처2에 연결할 URL)',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Designers table';

-- Create work_designers junction table (작품-디자이너 연결 테이블)
CREATE TABLE IF NOT EXISTS `work_designers` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Primary key, auto-increment ID',
  `work_id` BIGINT NOT NULL COMMENT 'Work ID',
  `designer_id` BIGINT NOT NULL COMMENT 'Designer ID',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  PRIMARY KEY (`id`),
  INDEX `idx_work_id` (`work_id`) COMMENT 'Index for finding designers by work',
  INDEX `idx_designer_id` (`designer_id`) COMMENT 'Index for finding works by designer',
  UNIQUE KEY `unique_work_designer` (`work_id`, `designer_id`) COMMENT 'Prevent duplicate associations'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Work-Designer association table';
