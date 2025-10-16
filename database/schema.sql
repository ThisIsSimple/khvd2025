-- KHVD 2025 Exhibition - Message Board Database Schema
-- MySQL Database Schema for Guestbook Messages

-- Create database (if needed)
-- CREATE DATABASE IF NOT EXISTS khvd_2025 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE khvd_2025;

-- Drop table if exists (for clean setup)
DROP TABLE IF EXISTS `messages`;

-- Create messages table (방명록 테이블)
CREATE TABLE `messages` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Primary key, auto-increment ID',
  `writer` VARCHAR(50) NOT NULL COMMENT 'Writer name (max 50 characters)',
  `password` VARCHAR(10) NOT NULL COMMENT 'Password for message edit/delete (max 10 characters)',
  `message` VARCHAR(200) NOT NULL COMMENT 'Message content (max 200 characters)',
  `type` VARCHAR(10) NULL DEFAULT NULL COMMENT 'Message type (optional, e.g., reply, normal)',
  `target_id` BIGINT NULL DEFAULT NULL COMMENT 'Target message ID for replies (optional)',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  PRIMARY KEY (`id`),
  INDEX `idx_created_at` (`created_at` DESC) COMMENT 'Index for pagination queries',
  INDEX `idx_target_id` (`target_id`) COMMENT 'Index for reply lookups',
  CONSTRAINT `fk_messages_target` FOREIGN KEY (`target_id`) REFERENCES `messages` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Guestbook messages table';

-- Sample data for testing (optional)
INSERT INTO `messages` (`writer`, `password`, `message`, `type`, `target_id`) VALUES
('김경희', '1234', '졸업 전시 너무 고생하셨습니다! 모두 멋진 작품들이에요 🎉', 'normal', NULL),
('이디자인', '5678', '정말 인상적인 전시였습니다. 앞으로도 계속 좋은 작품 기대할게요!', 'normal', NULL),
('박비주얼', '9999', '전시 준비하느라 힘들었을텐데 정말 멋져요! 축하합니다 ✨', 'normal', NULL),
('최학생', '0000', '4년간의 노력이 느껴지는 전시입니다. 수고 많으셨어요!', 'normal', NULL),
('정작품', '1111', '하나하나 정성이 가득 담긴 작품들이네요. 감동받았습니다!', 'normal', NULL);

-- Grant permissions (adjust username as needed)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON khvd_2025.messages TO 'khvd_user'@'localhost';
-- FLUSH PRIVILEGES;
