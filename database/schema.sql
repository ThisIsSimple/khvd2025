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
  `type` VARCHAR(10) NULL DEFAULT NULL COMMENT 'Message type (optional, e.g., reply, normal)',
  `target_id` BIGINT NULL DEFAULT NULL COMMENT 'Target message ID for replies (optional)',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updated_at` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
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

-- ================================================================
-- Exhibition Works & Designers Tables
-- ================================================================

-- Create works table (작품 테이블)
CREATE TABLE IF NOT EXISTS `works` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Primary key, auto-increment ID',
  `thumbnail` TEXT NOT NULL COMMENT 'Thumbnail image URL/path',
  `title` TEXT NOT NULL COMMENT 'Work title',
  `description` TEXT NOT NULL COMMENT 'Short description of the work',
  `content` TEXT NOT NULL COMMENT 'Detailed content/explanation',
  `professor` TEXT NOT NULL COMMENT 'Professor name(s)',
  `group_number` TINYINT NOT NULL COMMENT 'Group number (0-3 for GRADUATION STUDIES 0-3)',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updated_at` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  PRIMARY KEY (`id`),
  INDEX `idx_group_number` (`group_number`) COMMENT 'Index for filtering by group',
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
  `profile_image` TEXT NOT NULL COMMENT 'Profile image URL/path',
  `introduction` TEXT NOT NULL COMMENT 'Self introduction',
  `interview1` TEXT NOT NULL COMMENT 'Interview question 1 answer',
  `interview2` TEXT NOT NULL COMMENT 'Interview question 2 answer',
  `email` TEXT NULL DEFAULT NULL COMMENT 'Email address (optional)',
  `instagram` TEXT NULL DEFAULT NULL COMMENT 'Instagram handle (optional)',
  `instagram_qr_image` TEXT NULL DEFAULT NULL COMMENT 'Instagram QR code image (optional)',
  `homepage` TEXT NULL DEFAULT NULL COMMENT 'Personal homepage URL (optional)',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updated_at` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
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

-- ================================================================
-- Sample data for testing (optional)
-- ================================================================

-- Insert sample designers
INSERT INTO `designers` (`id`, `name`, `eng_name`, `profile_image`, `introduction`, `interview1`, `interview2`, `email`, `instagram`) VALUES
(1, '김디자인', 'Kim Design', '/images/designers/kim.jpg', '안녕하세요, 시각디자이너 김디자인입니다.', '디자인은 문제를 해결하는 창의적인 과정이라고 생각합니다.', '졸업 후에는 브랜딩 전문 디자이너로 성장하고 싶습니다.', 'kim@example.com', '@kim_design'),
(2, '이비주얼', 'Lee Visual', '/images/designers/lee.jpg', '경험 디자인에 관심이 많은 이비주얼입니다.', 'UX/UI 디자인을 통해 사용자에게 가치를 전달하고 싶습니다.', '인터랙티브 미디어 분야에서 일하고 싶습니다.', 'lee@example.com', '@lee_visual');

-- Insert sample works
INSERT INTO `works` (`id`, `thumbnail`, `title`, `description`, `content`, `professor`, `group_number`) VALUES
(1, '/images/works/work1-thumb.jpg', '지속 가능한 패키지 디자인', '친환경 소재를 활용한 패키지 디자인 프로젝트', '환경을 생각하는 디자인으로 플라스틱 사용을 최소화하고 재활용 가능한 소재를 활용했습니다. 제품의 본질을 해치지 않으면서도 지구를 생각하는 디자인을 제안합니다.', 'Eun Jeong Kim, Sang Hee Park', 0),
(2, '/images/works/work2-thumb.jpg', '도시 재생 브랜딩', '지역 커뮤니티를 위한 통합 브랜딩 프로젝트', '낡은 도시에 새로운 생명을 불어넣는 브랜딩 작업입니다. 지역 주민들과 함께 만들어가는 브랜드 아이덴티티를 통해 커뮤니티의 가치를 높입니다.', 'Kyungwon Lee, Aeri You', 1);

-- Link designers to works
INSERT INTO `work_designers` (`work_id`, `designer_id`) VALUES
(1, 1),
(2, 2);

-- Insert sample work images
INSERT INTO `work_images` (`work_id`, `image`, `platform`, `order`) VALUES
(1, '/images/works/work1-img1.jpg', 'pc', 1),
(1, '/images/works/work1-img2.jpg', 'pc', 2),
(1, '/images/works/work1-mobile.jpg', 'mobile', 1),
(2, '/images/works/work2-img1.jpg', 'pc', 1),
(2, '/images/works/work2-img2.jpg', 'pc', 2);
