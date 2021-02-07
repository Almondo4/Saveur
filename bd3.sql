-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               5.7.19 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for betadb3
CREATE DATABASE IF NOT EXISTS `betadb3` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `betadb3`;

-- Dumping structure for table betadb3.carts
CREATE TABLE IF NOT EXISTS `carts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `total_price` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- Dumping data for table betadb3.carts: ~16 rows (approximately)
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` (`id`, `total_price`, `created_at`, `updated_at`) VALUES
	(1betadb3, 0, '2018-06-15 16:58:46', '2018-06-15 16:58:46'),
	(2, 0, '2018-06-15 16:58:46', '2018-06-15 16:58:46'),
	(3, 700, '2018-06-15 16:58:46', '2018-06-18 02:55:45'),
	(4, 3200, '2018-06-15 16:58:46', '2018-06-16 18:09:43'),
	(5, 0, '2018-06-15 16:58:46', '2018-06-15 16:58:46'),
	(6, 0, '2018-06-15 16:58:46', '2018-06-15 16:58:46'),
	(8, 0, '2018-06-17 13:25:52', '2018-06-17 13:25:52'),
	(9, 1940, '2018-06-17 13:36:33', '2019-07-02 15:50:32'),
	(10, 0, '2018-06-17 18:31:59', '2018-06-17 18:31:59'),
	(11, 0, '2018-06-17 18:34:47', '2018-06-17 18:34:47'),
	(12, 0, '2018-06-17 18:52:37', '2018-06-17 18:52:37'),
	(13, 0, '2018-06-17 20:49:21', '2018-06-17 20:49:21'),
	(14, 0, '2018-06-17 20:58:59', '2018-06-17 20:58:59'),
	(15, 0, '2018-06-18 09:35:38', '2018-06-18 09:35:38'),
	(16, 0, '2018-06-18 09:35:38', '2018-06-18 09:35:38'),
	(17, 0, '2018-06-18 09:57:54', '2018-06-18 09:57:54'),
	(18, 0, '2018-11-17 14:25:49', '2018-11-17 14:25:49');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;

-- Dumping structure for table betadb3.cart_product
CREATE TABLE IF NOT EXISTS `cart_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Index 2` (`cart_id`),
  KEY `Index 3` (`product_id`),
  CONSTRAINT `FK__carts` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK__products` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- Dumping data for table betadb3.cart_product: ~8 rows (approximately)
/*!40000 ALTER TABLE `cart_product` DISABLE KEYS */;
INSERT INTO `cart_product` (`id`, `cart_id`, `product_id`) VALUES
	(1, 4, 14),
	(2, 4, 12),
	(3, 4, 1),
	(7, 4, 1),
	(8, 3, 1),
	(15, 9, 36),
	(16, 9, 31),
	(17, 9, 37);
/*!40000 ALTER TABLE `cart_product` ENABLE KEYS */;

-- Dumping structure for table betadb3.events
CREATE TABLE IF NOT EXISTS `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` text,
  `gift` varchar(50) DEFAULT NULL,
  `discount` int(11) NOT NULL DEFAULT '0',
  `starting` date NOT NULL,
  `ending` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Dumping data for table betadb3.events: ~6 rows (approximately)
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` (`id`, `description`, `gift`, `discount`, `starting`, `ending`, `created_at`, `updated_at`) VALUES
	(1, 'undefined', '545', 20, '2018-06-23', '2018-06-28', '2018-06-14 23:48:57', '2018-06-18 10:21:00'),
	(2, 'free coffee for every one', 'coffee', 0, '2018-06-13', '2018-07-01', '2018-06-14 23:52:46', '2018-06-18 07:11:51'),
	(3, 'start wars movie   fund raiser', 'popcorn', 0, '2018-06-13', '2018-06-13', '2018-06-14 23:55:22', '2018-06-18 07:12:05'),
	(4, 'Live musicafter sunset', 'popcorn', 0, '2018-06-16', '2018-06-26', '2018-06-14 23:56:14', '2018-06-16 11:04:35'),
	(5, 'piano dinner played by the maestro \'James Newton Howard', NULL, 0, '2018-06-15', '2018-06-28', '2018-06-14 23:59:07', '2018-06-14 23:59:07'),
	(6, 'The annual masked carnaval. With frood, drinks, pioa and party all included', 'drinks', 0, '2018-06-10', '2018-06-28', '2018-06-15 00:00:45', '2018-06-18 07:12:54');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;

-- Dumping structure for table betadb3.exception_periods
CREATE TABLE IF NOT EXISTS `exception_periods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `exception_date` date NOT NULL,
  `duration` int(11) NOT NULL,
  `schedule_id` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `Index 2` (`schedule_id`),
  CONSTRAINT `FK_exceptions_schedules` FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- Dumping data for table betadb3.exception_periods: ~13 rows (approximately)
/*!40000 ALTER TABLE `exception_periods` DISABLE KEYS */;
INSERT INTO `exception_periods` (`id`, `exception_date`, `duration`, `schedule_id`, `created_at`, `updated_at`) VALUES
	(8, '2018-07-25', 2, 1, '2018-06-18 02:48:42', '2018-06-18 02:48:42'),
	(9, '2018-07-01', 30, 1, '2018-06-18 02:52:22', '2018-06-18 10:56:47'),
	(10, '2018-06-19', 2, 1, '2018-06-18 02:54:31', '2018-06-18 02:54:31'),
	(11, '2018-06-19', 2, 1, '2018-06-18 02:56:51', '2018-06-18 02:56:51'),
	(12, '2018-06-19', 2, 1, '2018-06-18 02:57:28', '2018-06-18 02:57:28'),
	(13, '2018-06-19', 2, 1, '2018-06-18 02:57:55', '2018-06-18 02:57:55'),
	(14, '2018-06-19', 2, 1, '2018-06-18 02:59:17', '2018-06-18 02:59:17'),
	(16, '2018-06-26', 2, 1, '2018-06-18 07:49:53', '2018-06-18 07:49:53'),
	(17, '2018-07-13', 12, 1, '2018-06-18 10:57:54', '2018-06-18 10:57:54'),
	(18, '2018-07-13', 12, 1, '2018-06-18 10:58:02', '2018-06-18 10:58:02'),
	(19, '2019-07-18', 5, 1, '2019-07-02 16:08:54', '2019-07-02 16:08:54'),
	(20, '2019-07-18', 5, 1, '2019-07-02 16:08:57', '2019-07-02 16:08:57'),
	(21, '2019-07-20', 25, 1, '2019-07-02 16:10:24', '2019-07-02 16:10:24'),
	(22, '2019-07-20', 5, 1, '2019-07-02 16:11:00', '2019-07-02 16:11:00');
/*!40000 ALTER TABLE `exception_periods` ENABLE KEYS */;

-- Dumping structure for table betadb3.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `total_price` int(11) NOT NULL DEFAULT '1',
  `reservation_id` int(10) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `applied_coupon` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_orders_reservations1` (`reservation_id`),
  CONSTRAINT `fk_orders_reservations1` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- Dumping data for table betadb3.orders: ~5 rows (approximately)
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` (`id`, `total_price`, `reservation_id`, `created_at`, `updated_at`, `applied_coupon`) VALUES
	(5, 0, 6, '2018-04-28 09:37:44', '2018-06-17 02:03:11', 1),
	(8, 2500, 6, '2018-04-28 09:39:29', '2018-06-13 14:58:28', 0),
	(9, 1, 2, '2018-04-28 09:40:56', '2018-04-28 09:40:56', 0),
	(10, 0, 10, '2018-06-16 18:13:53', '2018-06-17 16:48:48', 6),
	(11, 800, 10, '2018-06-16 18:14:09', '2018-06-17 16:48:48', 1),
	(12, 900, 10, '2018-06-16 18:16:01', '2018-06-17 16:48:48', 1);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;

-- Dumping structure for table betadb3.order_product
CREATE TABLE IF NOT EXISTS `order_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_products_has_orders_orders1_idx` (`order_id`),
  KEY `fk_products_has_orders_products1_idx` (`product_id`),
  CONSTRAINT `fk_products_has_orders_orders1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_has_orders_products1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- Dumping data for table betadb3.order_product: ~15 rows (approximately)
/*!40000 ALTER TABLE `order_product` DISABLE KEYS */;
INSERT INTO `order_product` (`id`, `product_id`, `order_id`) VALUES
	(1, 2, 5),
	(2, 1, 8),
	(3, 2, 5),
	(4, 2, 5),
	(5, 16, 5),
	(6, 16, 5),
	(7, 24, 9),
	(8, 14, 11),
	(9, 12, 11),
	(10, 1, 11),
	(11, 1, 11),
	(12, 14, 12),
	(13, 12, 12),
	(14, 1, 12),
	(15, 1, 12);
/*!40000 ALTER TABLE `order_product` ENABLE KEYS */;

-- Dumping structure for table betadb3.photos
CREATE TABLE IF NOT EXISTS `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `path` varchar(50) NOT NULL,
  `imageable_id` int(11) NOT NULL,
  `imageable_type` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;

-- Dumping data for table betadb3.photos: ~47 rows (approximately)
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
INSERT INTO `photos` (`id`, `path`, `imageable_id`, `imageable_type`, `created_at`, `updated_at`) VALUES
	(1, 'http://lumen.test/dishes/last logo.png', 1, 'App\\Product', '2018-04-28 22:48:32', '2018-06-14 15:46:35'),
	(2, 'http://lumen.test/dishes/Waku-Ghin.jpg', 1, 'App\\Product', '2018-04-28 22:48:52', '2018-06-13 13:11:31'),
	(4, 'http://lumen.test/users/razer.jpg', 8, 'App\\User', '2018-04-28 22:48:52', '2018-06-13 22:36:13'),
	(5, 'http://lumen.test/users/pic1.png', 8, 'App\\User', '2018-04-28 22:48:52', '2018-06-18 07:00:10'),
	(8, 'http://lumen.test/users/shroud.jpg', 31, 'App\\User', '2018-06-14 14:06:12', '2018-06-14 14:06:12'),
	(9, 'http://lumen.test/users/pic2.png', 32, 'App\\User', '2018-06-14 14:45:28', '2018-06-18 07:00:15'),
	(10, 'http://lumen.test/users/pic3.png', 1, 'App\\User', '2018-06-14 14:53:49', '2018-06-18 07:00:20'),
	(13, 'http://lumen.test/dishes/Banana.jpg', 29, 'App\\Product', '2018-06-14 15:42:26', '2018-06-14 15:42:26'),
	(14, 'http://lumen.test/events/20off_event.png', 1, 'App\\Event', '2018-06-14 23:48:57', '2018-06-15 00:05:04'),
	(15, 'http://lumen.test/events/coffe_event.png', 2, 'App\\Event', '2018-06-14 23:52:46', '2018-06-14 23:52:46'),
	(16, 'http://lumen.test/events/Fundraiser_event.png', 3, 'App\\Event', '2018-06-14 23:55:22', '2018-06-15 00:05:09'),
	(17, 'http://lumen.test/events/live_music_event.png', 4, 'App\\Event', '2018-06-14 23:56:14', '2018-06-14 23:56:14'),
	(18, 'http://lumen.test/events/piano_event.png', 5, 'App\\Event', '2018-06-14 23:59:07', '2018-06-15 00:05:16'),
	(19, 'http://lumen.test/events/masked_event.png', 6, 'App\\Event', '2018-06-15 00:00:46', '2018-06-15 00:05:21'),
	(20, 'http://lumen.test/dishes/Sea_bass.jpg', 12, 'App\\Product', '2018-06-15 01:48:54', '2018-06-15 01:48:54'),
	(21, 'http://lumen.test/dishes/Grilled-sea_bass.jpg', 14, 'App\\Product', '2018-06-15 02:00:25', '2018-06-15 02:00:25'),
	(22, 'http://lumen.test/dishes/Cod_starter.jpg', 31, 'App\\Product', '2018-06-15 02:13:41', '2018-06-15 02:13:41'),
	(23, 'http://lumen.test/dishes/Chipotle_and_coffee.jpg', 33, 'App\\Product', '2018-06-15 02:22:09', '2018-06-18 10:03:57'),
	(24, 'http://lumen.test/dishes/Roast_chicken_breast.jpg', 34, 'App\\Product', '2018-06-15 02:30:07', '2018-06-15 02:30:07'),
	(25, 'http://lumen.test/dishes/Vegan_mushroom.jpg', 35, 'App\\Product', '2018-06-15 02:42:09', '2018-06-18 10:04:59'),
	(26, 'http://lumen.test/dishes/Warm_goat’s.jpg', 36, 'App\\Product', '2018-06-15 03:06:41', '2018-06-18 10:05:31'),
	(27, 'http://lumen.test/dishes/Mackerel_horseradish.jpg', 37, 'App\\Product', '2018-06-15 03:10:13', '2018-06-18 10:05:50'),
	(28, 'http://lumen.test/dishes/Grilled_squid.jpg', 38, 'App\\Product', '2018-06-15 03:20:50', '2018-06-15 03:20:50'),
	(29, 'http://lumen.test/dishes/Saveur_Dessert.jpg', 39, 'App\\Product', '2018-06-15 03:25:43', '2018-06-15 03:25:43'),
	(30, 'http://lumen.test/dishes/Salted_caramel.jpg', 40, 'App\\Product', '2018-06-15 03:28:06', '2018-06-18 10:06:18'),
	(31, 'http://lumen.test/dishes/Chocolate_tart.jpg', 41, 'App\\Product', '2018-06-15 03:30:23', '2018-06-15 03:30:38'),
	(32, 'http://lumen.test/dishes/Waku-Ghin.jpg', 8, 'App\\Product', '2018-06-15 03:48:10', '2018-06-15 03:48:10'),
	(33, 'http://lumen.test/dishes/The-Golden-Phoenix.jpg', 4, 'App\\Product', '2018-06-15 03:49:35', '2018-06-18 10:10:01'),
	(34, 'http://lumen.test/coupons/reduction1.png', 1, 'App\\Reduction', '2018-06-16 16:00:15', '2018-06-16 16:00:15'),
	(35, 'http://lumen.test/coupons/reduction2.png', 2, 'App\\Reduction', '2018-06-16 16:06:11', '2018-06-16 16:06:11'),
	(36, 'http://lumen.test/coupons/reduction3.png', 3, 'App\\Reduction', '2018-06-16 16:07:05', '2018-06-16 16:07:05'),
	(37, 'http://lumen.test/coupons/reduction3.png', 4, 'App\\Reduction', '2018-06-16 23:40:42', '2018-06-16 23:40:42'),
	(38, 'http://lumen.test/events/The-Golden-Phoenix-cupcak', 7, 'App\\Event', '2018-06-17 00:08:41', '2018-06-17 13:20:30'),
	(41, 'http://lumen.test/events/Fundraiser event.png', 9, 'App\\Event', '2018-06-17 18:19:11', '2018-06-17 18:19:11'),
	(42, 'http://lumen.test/events/Fundraiser event.png', 10, 'App\\Event', '2018-06-17 18:25:10', '2018-06-17 18:25:10'),
	(43, 'http://lumen.test/users/pic5.png', 14, 'App\\User', '2018-06-17 18:32:00', '2018-06-18 07:00:42'),
	(44, 'http://lumen.test/users/pic1.jpg', 15, 'App\\User', '2018-06-17 18:34:48', '2018-06-18 07:02:54'),
	(45, 'http://lumen.test/events/Fundraiser event.png', 11, 'App\\Event', '2018-06-17 18:39:42', '2018-06-17 18:39:42'),
	(46, 'http://lumen.test/events/Fundraiser event.png', 12, 'App\\Event', '2018-06-17 18:40:58', '2018-06-17 18:40:58'),
	(47, 'http://lumen.test/events/Fundraiser event.png', 13, 'App\\Event', '2018-06-17 18:50:12', '2018-06-17 18:50:12'),
	(48, 'http://lumen.test/events/Fundraiser event.png', 14, 'App\\Event', '2018-06-17 18:51:24', '2018-06-17 18:51:24'),
	(49, 'http://lumen.test/users/pic4.png', 16, 'App\\User', '2018-06-17 18:52:37', '2018-06-18 07:00:35'),
	(50, 'http://lumen.test/events/Fundraiser event.png', 15, 'App\\Event', '2018-06-17 18:53:21', '2018-06-17 18:53:21'),
	(51, 'http://lumen.test/events/Fundraiser event.png', 16, 'App\\Event', '2018-06-17 18:55:14', '2018-06-17 18:55:14'),
	(52, 'http://lumen.test/events/Fundraiser event.png', 17, 'App\\Event', '2018-06-17 18:57:56', '2018-06-17 18:57:56'),
	(53, 'http://lumen.test/events/Fundraiser event.png', 18, 'App\\Event', '2018-06-17 20:18:04', '2018-06-17 20:18:04'),
	(54, 'http://lumen.test/events/Fundraiser event.png', 19, 'App\\Event', '2018-06-17 20:20:11', '2018-06-17 20:20:11'),
	(55, 'http://lumen.test/events/Fundraiser event.png', 20, 'App\\Event', '2018-06-17 20:21:32', '2018-06-17 20:21:32'),
	(56, 'http://lumen.test/events/Fundraiser event.png', 21, 'App\\Event', '2018-06-17 20:22:09', '2018-06-17 20:22:09'),
	(57, 'http://lumen.test/events/Fundraiser event.png', 22, 'App\\Event', '2018-06-17 20:39:41', '2018-06-17 20:39:41'),
	(58, 'http://lumen.test/events/Fundraiser event.png', 23, 'App\\Event', '2018-06-17 20:43:15', '2018-06-17 20:43:15'),
	(59, 'http://lumen.test/events/Fundraiser event.png', 24, 'App\\Event', '2018-06-17 20:48:17', '2018-06-17 20:48:17'),
	(60, 'http://lumen.test/events/Fundraiser event.png', 25, 'App\\Event', '2018-06-17 20:50:56', '2018-06-17 20:50:56'),
	(61, 'http://lumen.test/events/Fundraiser event.png', 26, 'App\\Event', '2018-06-17 20:54:03', '2018-06-17 20:54:03'),
	(62, 'http://lumen.test/events/Fundraiser event.png', 27, 'App\\Event', '2018-06-17 20:54:54', '2018-06-17 20:54:54'),
	(64, 'http://lumen.test/events/Fundraiser event.png', 28, 'App\\Event', '2018-06-17 21:01:49', '2018-06-17 21:01:49'),
	(65, 'http://lumen.test/events/Fundraiser event.png', 29, 'App\\Event', '2018-06-17 21:05:00', '2018-06-17 21:05:00'),
	(66, 'http://lumen.test/events/Fundraiser event.png', 30, 'App\\Event', '2018-06-18 02:36:25', '2018-06-18 02:36:25'),
	(67, 'http://lumen.test/users/Banana.jpg', 6, 'App\\User', '2018-06-18 04:35:45', '2018-06-18 04:35:45'),
	(68, 'http://lumen.test/users/msi-RGB-1.jpg', 13, 'App\\User', '2018-06-18 07:04:04', '2018-06-18 07:04:04'),
	(69, 'http://lumen.test/users/2TkvcwF-msi-wallpaper.jpg', 21, 'App\\User', '2018-06-18 09:58:31', '2018-06-18 09:58:31');
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;

-- Dumping structure for table betadb3.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `available` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `inMenu` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `description` text,
  `ingredients` text,
  `category` enum('starter','main','dessert') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;

-- Dumping data for table betadb3.products: ~40 rows (approximately)
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` (`id`, `name`, `price`, `available`, `created_at`, `updated_at`, `inMenu`, `description`, `ingredients`, `category`) VALUES
	(1, 'scallop of foie gras', 700.00, 1, '2018-04-28 14:18:46', '2018-06-14 15:47:09', 0, 'FOIE  GRAS  POELE A LA POIRE CONFINE', NULL, 'main'),
	(2, 'chinese duck with pineapple', 1200.00, 1, '2018-05-12 16:15:45', '2018-05-12 16:15:46', 0, 'RECETTE AU MAGRET D\'ANANAS', NULL, 'main'),
	(3, 'POULET ET AGRUMES', 650.00, 1, '2018-05-12 16:15:45', '2018-06-16 11:18:58', 0, NULL, NULL, 'dessert'),
	(4, 'The Golden Phoenix cupcake', 750.00, 1, '2018-05-28 18:59:00', '2018-05-28 18:59:00', 1, 'We have seen people attempt the most expensive cupcakes before, however those cupcakes are not edible as they are encrusted with diamonds and other components.', NULL, 'dessert'),
	(5, 'HAMBURGER', 350.00, 1, '2018-05-28 18:59:27', '2018-05-28 18:59:28', 0, 'PLAT LE PLUS COMMANDE AU MONDE', 'Doves organic flour from the United Kingdom, Rachels organic butter from the United Kingdom, Premium Amedei Porcelena cocoa from Italy, Gold Ugandan high quality vanilla beans, 23 carat gold ', 'main'),
	(6, 'ŒUFS SUR PLAT AU CHEVRE', 350.00, 1, '2018-05-28 18:59:57', '2018-05-28 18:59:57', 0, 'SAUCE AU KETCHUP', NULL, 'main'),
	(7, 'ECREVISSES A L AIL  ET PERSIL', 2000.00, 1, '2018-05-28 19:01:00', '2018-05-28 19:01:01', 0, 'FRICASSES D ECREVISSES', NULL, 'main'),
	(8, 'Waku Ghin', 950.00, 1, '2018-05-28 19:01:18', '2018-06-18 07:25:34', 1, 'An innovative selection of choices including signature items such as the Marinated Botan Shrimp with Sea Urchin and Caviar, and a perfectly seared (20 seconds on both sides) wagyu, will ensure the memory of this meal lingers on long after you\'ve left the restaurant.', ' Marinated Botan Shrimp, Sea Urchin, Caviar, wagyu, wasabi, soya', 'main'),
	(9, 'BOULETTES DE VIANDE AU FROMAGE', 400.00, 1, '2018-05-28 19:01:43', '2018-05-28 19:01:43', 0, 'VIANDE ET FROMEGE  DE CHEVRE', ' Marinated Botan Shrimp, Sea Urchin, Caviar', 'main'),
	(10, 'ŒUFS AU PLAT ET TAGLIATELLES', 500.00, 1, '2018-05-28 19:02:12', '2018-05-28 19:02:12', 0, 'PATTE', NULL, 'main'),
	(11, 'PLAT DE RIZ A L INDIENNE', 400.00, 1, '2018-05-28 19:02:34', '2018-05-28 19:02:35', 0, 'RIZ  EPICE', NULL, 'main'),
	(12, 'Sea bass', 800.00, 1, '2018-05-28 19:03:01', '2018-06-15 01:47:29', 1, 'Pan-fried sea bass sits beautifully atop a mound of creamy beans in Mark Dodson\'s indulgent recipe. A rich Jerusalem artichoke purée and robust olive oil jus are perfect accompaniments, while the suggested plating with deep-fried rocket and sun-dried tomatoes would take this dish to another level.', 'Jerusalem artichoke \nsalt , shallots , olive oil, fresh thyme, Roasted garlic, Beans', 'main'),
	(13, 'LASAGNE', 800.00, 1, '2018-05-28 19:03:48', '2018-05-28 19:03:48', 0, 'PATTE AU FOUR', NULL, 'main'),
	(14, 'Grilled sea bass', 1000.00, 1, '2018-05-28 19:04:23', '2018-06-15 02:00:25', 1, 'Grilling a whole sea bass on the barbecue is an enticing option. In this grilled sea bass recipe, Dominic Chapman stuffs the sea bass with fennel, dill and lemon to give the fish a citrusy depth of flavour. The fish is served with an orange and fennel salad - a perfect summer delight.', 'Sea bass,  bulbs of fennel ,  lemons, olive oil, Orange and fennel salad, Vinaigrette,vine tomatoes ', 'main'),
	(15, 'CLEHOCOLATE  SOUFFE', 300.00, 1, '2018-05-28 19:05:00', '2018-05-28 19:05:01', 0, 'CHOCOLAT NOIR', NULL, 'dessert'),
	(16, 'DESSERT AU NESQUIK', 150.00, 1, '2018-05-28 19:05:27', '2018-05-28 19:05:27', 0, 'CREME DESSERT', NULL, 'dessert'),
	(17, 'CHARLOTTE AUCHOCOLAT NESTLET', 400.00, 1, '2018-05-28 19:06:48', '2018-05-28 19:06:48', 0, 'GATEAU AU CHOCOLAT', NULL, 'dessert'),
	(18, 'MANGO MOUSSE', 300.00, 1, '2018-05-28 19:07:34', '2018-05-28 19:07:34', 0, 'MOUSSE A LA MANGE', NULL, 'dessert'),
	(19, 'SALADE AUX FRUITS', 350.00, 1, '2018-05-28 19:07:57', '2018-05-28 19:07:57', 0, 'SALADEDES FRUITS AUX EPIC', NULL, 'dessert'),
	(20, 'bouchees-pain epices', 60.00, 1, '2018-05-28 19:10:34', '2018-05-28 19:10:34', 0, 'FRUITS FRAIS', NULL, 'dessert'),
	(21, 'SALADE DE FRUITS CHAMPENOISE', 350.00, 1, '2018-05-28 19:10:52', '2018-05-28 19:10:52', 0, 'FRUITS SECS ET FRAIS', NULL, 'dessert'),
	(22, 'PANNA COTTA AUX FRUITS EXOTIQUES', 500.00, 1, '2018-05-28 19:11:53', '2018-05-28 19:11:54', 0, 'FRUITS  EXOTIQUES  MANGE', NULL, 'dessert'),
	(23, 'ENTREE AU SURIMI', 400.00, 1, '2018-05-28 19:12:18', '2018-05-28 19:12:18', 0, 'AU SAUMON FUME ET AUX CREVRTTES', NULL, 'starter'),
	(24, ' ENTREE DE FRUITS DE MER', 400.00, 1, '2018-05-28 19:12:47', '2018-05-28 19:12:47', 0, 'AVOCAT ET FRUITS DE MER', NULL, 'starter'),
	(25, 'TOMATE ŒUF DUR', 200.00, 1, '2018-05-28 19:13:09', '2018-05-28 19:13:09', 0, 'SALADE DE TOMATE', NULL, 'starter'),
	(26, 'ENTREE VEGETARIENNE', 250.00, 1, '2018-05-28 19:13:22', '2018-05-28 19:13:22', 0, 'SALADE DE CONCOMBRE', NULL, 'starter'),
	(27, 'LA CREME BRULEE AU FOIE GRAS', 200.00, 0, '2018-05-28 19:14:31', '2018-06-14 18:57:40', 0, NULL, NULL, 'starter'),
	(28, 'BOUCHEES DE FROMAGE', 250.00, 1, '2018-05-28 19:15:00', '2018-05-28 19:15:00', 0, 'BOUCHEES DE FROMAGE AU PAIN D EPICES', NULL, 'starter'),
	(29, 'banana2', 100.00, 1, '2018-06-14 15:42:26', '2018-06-14 15:42:26', 0, NULL, NULL, 'starter'),
	(31, 'Cod starter', 350.00, 1, '2018-06-15 02:11:39', '2018-06-15 02:13:41', 1, 'While cod is loved as a comfort food stalwart, there is a more refined side to this succulent white fish, making it the perfect starter for any menu', 'cod fillet, Cod salt mix , Baby gems,Langoustine cigars, Langoustine mix, Crispy squid, Cod dressing, Hermitage jus', 'starter'),
	(33, 'Chipotle and coffee barbecued short ribs ', 900.00, 1, '2018-06-15 02:22:09', '2018-06-15 02:22:09', 1, 'Helen Graves serves up a smoky, spicy barbecued short rib recipe, infused with coffee and chipotle chilli spice rub for a heady finish. The spice rub is made my pulsing dry ingredients in a Vitamix for a beautifully consistent finish. Serve with your choice of barbecue sides.', 'rack of beef short ribs , coffee beans  , dried chipotle chillies , dark brown sugar, cumin seeds , salt', 'main'),
	(34, 'Roast chicken breast with sage and onion pudd', 800.00, 1, '2018-06-15 02:30:07', '2018-06-15 02:30:07', 1, 'There are a few chapters to this delightful roast chicken breast recipe from Sean Hope so it will take some preparation and planning to get it right. Cooking chicken breast with the skin on helps retains the moisture and adds a wonderful rich flavour to the meat.', 'Roast chicken breast , Suet dough, Sage and onion filling , Madeira gravy, Confit shallots, Confit chorizo, Chestnut mushrooms, Broccoli', 'main'),
	(35, 'Vegan mushroom, chestnut and thyme pithivier ', 650.00, 1, '2018-06-15 02:42:09', '2018-06-15 02:42:35', 1, 'If you need to cater for vegans over the festive season, try Karen\'s showstopper main course pithivier which is sure to please. Filled with chestnuts, mushrooms and thyme, carnivores will be jealous of what\'s on offer', 'puff pastry, vegan, ready-rolled , mixed seasonal wild mushrooms,  cooked chestnuts ,  shallots, garlic cloves,  thyme leaves, silken tofu, Madeira or sherry', 'main'),
	(36, 'Warm goat’s cheese salad', 250.00, 1, '2018-06-15 03:06:41', '2018-06-15 03:06:41', 1, 'Galton Blackiston\'s simple goats cheese salad recipe allows the individual flavours of the ingredients to shine through. The savoury tapenade provides a wonderful contrast to the creamy goats cheese and rocket, making this a lovely starter to any meal.', 'Warm goat’s cheese salad, Tapenade, Shallot dressing', 'starter'),
	(37, 'Mackerel, horseradish snow', 290.00, 1, '2018-06-15 03:10:13', '2018-06-15 03:10:13', 1, 'This mackerel with horseradish snow recipe from Steven Smith offers a modernist take on some classic flavour combinations, with mackerel, horseradish and cucumber combining to eye-catching effect.', 'Mackerel, Horseradish snow, Cucumber purée, Sauce vierge', 'starter'),
	(38, 'Seafood starter', 350.00, 1, '2018-06-15 03:20:50', '2018-06-15 03:20:50', 1, 'With a splash of colour, Roberto Petza\'s simple seafood starter recipe contains a wonderful array of flavours and textures. Delicate baby squid are coated in a fragrant herb oil before being grilled to give a slight char and bite. These are then served with a rich smoked ricotta cream and the crunch of fresh, raw salad vegetables', ' baby squid, extra virgin olive oil, thyme, rosemary, piece of fresh ginger, bay leaves, Ricotta cream, carrots, celery, fennel, radishes', 'starter'),
	(39, 'Saveur Dessert', 350.00, 1, '2018-06-15 03:25:42', '2018-06-15 03:25:42', 1, 'This impressive deconstructed apple crumble dessert from Graham Garrett is a celebration of British autumnal ingredients, featuring apples, elderberries, blackberries and cobnuts. Although there are a number of elements to this dish, each step is relatively simple and well worth the effort.', 'Pressed apple, Elderberry sorbet, Cobnut cream, Poached blackberries, Cobnut crumble', 'dessert'),
	(40, 'Salted caramel chocolate tarts ', 100.00, 1, '2018-06-15 03:28:06', '2018-06-15 03:28:06', 1, 'Looking for a decadent treat? Discover how to make some salted caramel chocolate tarts. These tasty desserts are a rich and indulgent treat that you can’t say no to! ', 'Pretzel crust, Chocolate filling, Caramel sauce', 'dessert'),
	(41, 'Chocolate tart', 300.00, 1, '2018-06-15 03:30:23', '2018-06-15 03:30:38', 1, 'Dominic Chapman’s lovely chocolate tart is a simple-to-make dessert that would be a wonderful finish to a meal. The orange zest and chopped hazelnuts are delicious additions to the tart base, as both are fabulous taste partners with chocolate. ', 'Chocolate tart base, Chocolate tart filling', 'dessert'),
	(42, 'choco', 0.00, 1, '2018-06-16 11:19:30', '2018-06-16 11:19:30', 0, NULL, NULL, 'dessert'),
	(43, 'choco1', 0.00, 1, '2018-06-16 17:29:56', '2018-06-16 17:29:56', 0, NULL, NULL, 'dessert');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;

-- Dumping structure for table betadb3.reductions
CREATE TABLE IF NOT EXISTS `reductions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` int(11) NOT NULL,
  `type` enum('percentage','discount') NOT NULL,
  `stackable` enum('true','false') NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Dumping data for table betadb3.reductions: ~5 rows (approximately)
/*!40000 ALTER TABLE `reductions` DISABLE KEYS */;
INSERT INTO `reductions` (`id`, `value`, `type`, `stackable`, `created_at`, `updated_at`) VALUES
	(1, 12, 'percentage', 'false', '2018-06-16 16:00:15', '2018-06-16 16:00:15'),
	(2, 20, 'percentage', 'false', '2018-06-16 16:06:11', '2018-06-16 16:06:11'),
	(3, 300, 'discount', 'true', '2018-06-16 16:07:05', '2018-06-16 16:07:05'),
	(4, 300, 'discount', 'false', '2018-06-16 23:40:42', '2018-06-17 03:05:56'),
	(7, 0, 'discount', 'false', '2018-06-17 14:30:15', '2018-06-18 01:18:06');
/*!40000 ALTER TABLE `reductions` ENABLE KEYS */;

-- Dumping structure for table betadb3.reduction_user
CREATE TABLE IF NOT EXISTS `reduction_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reduction_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `expiry_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reductions_has_users_users1_idx` (`user_id`),
  KEY `fk_reductions_has_users_reductions1_idx` (`reduction_id`),
  CONSTRAINT `fk_reductions_has_users_reductions1` FOREIGN KEY (`reduction_id`) REFERENCES `reductions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_reductions_has_users_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- Dumping data for table betadb3.reduction_user: ~3 rows (approximately)
/*!40000 ALTER TABLE `reduction_user` DISABLE KEYS */;
INSERT INTO `reduction_user` (`id`, `reduction_id`, `user_id`, `expiry_date`) VALUES
	(7, 2, 4, '2018-06-24'),
	(8, 2, 4, '2018-06-25'),
	(9, 2, 4, '2018-06-25'),
	(10, 2, 4, '2018-06-25');
/*!40000 ALTER TABLE `reduction_user` ENABLE KEYS */;

-- Dumping structure for table betadb3.reservations
CREATE TABLE IF NOT EXISTS `reservations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `position` int(11) unsigned NOT NULL,
  `reservation_date` date NOT NULL,
  `reservation_time` time NOT NULL DEFAULT '10:00:00',
  `confirmed` enum('Y','N','U','M') NOT NULL DEFAULT 'N',
  `duration` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reservations_users1_idx` (`user_id`),
  KEY `position_idx` (`position`),
  CONSTRAINT `fk_reservations_tables1` FOREIGN KEY (`position`) REFERENCES `tables` (`position`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_reservations_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- Dumping data for table betadb3.reservations: ~16 rows (approximately)
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` (`id`, `position`, `reservation_date`, `reservation_time`, `confirmed`, `duration`, `created_at`, `updated_at`, `user_id`) VALUES
	(2, 1, '2018-06-15', '10:30:00', 'Y', 1, '2018-04-26 13:23:31', '2018-06-17 02:11:34', 4),
	(4, 2, '2018-06-15', '14:30:00', 'N', 1, '2018-04-26 13:24:45', '2018-06-17 02:03:33', 4),
	(6, 1, '2018-06-15', '18:30:00', 'Y', 1, '2018-04-27 11:47:39', '2018-06-17 02:08:57', 4),
	(8, 20, '2018-06-15', '16:00:00', 'N', 2, '2018-06-05 10:46:43', '2018-06-17 02:03:35', 4),
	(9, 20, '2018-06-15', '13:00:00', 'N', 2, '2018-06-05 10:46:30', '2018-06-17 02:03:38', 4),
	(10, 20, '2018-06-17', '12:30:23', 'Y', 1, '2018-06-07 12:33:09', '2018-06-17 15:39:40', 4),
	(11, 20, '2018-06-17', '12:30:23', 'N', 1, '2018-06-07 12:33:12', '2018-06-17 02:03:43', 4),
	(15, 5, '2018-06-25', '23:00:00', 'N', 1, '2018-06-18 04:14:54', '2018-06-18 04:14:54', 2),
	(24, 2, '2018-06-19', '11:55:31', 'N', 1, '2018-06-18 07:59:51', '2018-06-18 07:59:51', 13),
	(25, 1, '2018-06-19', '11:55:31', 'N', 1, '2018-06-18 08:00:01', '2018-06-18 08:00:01', 13),
	(26, 20, '2018-06-19', '11:55:31', 'N', 1, '2018-06-18 08:00:31', '2018-06-18 08:00:31', 13),
	(27, 2, '2018-06-30', '01:00:55', 'N', 1, '2018-06-18 08:05:20', '2018-06-18 08:05:20', 13),
	(28, 5, '2018-06-30', '01:00:55', 'N', 1, '2018-06-18 08:13:04', '2018-06-18 08:13:04', 13),
	(29, 9, '2018-06-30', '01:00:55', 'N', 1, '2018-06-18 08:13:22', '2018-06-18 08:13:22', 13),
	(30, 2, '2018-06-24', '09:10:43', 'N', 1, '2018-06-18 08:15:00', '2018-06-18 08:15:00', 13),
	(33, 1, '2018-06-24', '02:30:34', 'N', 3, '2018-06-18 09:40:37', '2018-06-18 09:40:37', 13),
	(34, 10, '2018-06-19', '19:05:38', 'N', 1, '2018-06-18 11:07:30', '2018-06-18 11:07:30', 13);
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;

-- Dumping structure for table betadb3.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Dumping data for table betadb3.roles: ~2 rows (approximately)
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
	(1, 'admin', '2018-04-18 22:13:08', '2018-04-18 22:13:08'),
	(2, 'client', '2018-04-18 22:13:29', '2018-04-18 22:13:29'),
	(3, 'supervisor', '2018-04-18 22:13:40', '2018-04-18 22:13:40');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

-- Dumping structure for table betadb3.schedules
CREATE TABLE IF NOT EXISTS `schedules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `opening_day` enum('sunday','monday','tuesday','wednesday','thursday','friday','saturday') NOT NULL,
  `closing_day` enum('sunday','monday','tuesday','wednesday','thursday','friday','saturday') NOT NULL,
  `opening_time` time NOT NULL,
  `closing_time` time NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumping data for table betadb3.schedules: ~0 rows (approximately)
/*!40000 ALTER TABLE `schedules` DISABLE KEYS */;
INSERT INTO `schedules` (`id`, `opening_day`, `closing_day`, `opening_time`, `closing_time`, `created_at`, `updated_at`) VALUES
	(1, 'tuesday', 'friday', '07:00:16', '17:15:36', '2018-06-13 16:14:43', '2019-07-02 16:20:42');
/*!40000 ALTER TABLE `schedules` ENABLE KEYS */;

-- Dumping structure for table betadb3.subscribers
CREATE TABLE IF NOT EXISTS `subscribers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `index1` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Dumping data for table betadb3.subscribers: ~4 rows (approximately)
/*!40000 ALTER TABLE `subscribers` DISABLE KEYS */;
INSERT INTO `subscribers` (`id`, `email`, `created_at`, `updated_at`) VALUES
	(1, 'subscriber@gmail.com', '2018-06-13 20:49:01', '2018-06-13 20:49:01'),
	(2, 'subscriber2.0@gmail.com', '2018-06-13 20:49:19', '2018-06-13 20:49:19'),
	(3, 'subscriber3.0@gmail.com', '2018-06-14 10:17:16', '2018-06-14 10:17:16'),
	(4, 'subscriber4.0@gmail.com', '2018-06-14 10:19:21', '2018-06-14 10:19:21');
/*!40000 ALTER TABLE `subscribers` ENABLE KEYS */;

-- Dumping structure for table betadb3.tables
CREATE TABLE IF NOT EXISTS `tables` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nbPlaces` enum('2','4','8') NOT NULL,
  `position` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE` (`position`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- Dumping data for table betadb3.tables: ~6 rows (approximately)
/*!40000 ALTER TABLE `tables` DISABLE KEYS */;
INSERT INTO `tables` (`id`, `nbPlaces`, `position`, `created_at`, `updated_at`) VALUES
	(1, '2', 2, '2018-04-26 12:37:02', '2018-05-04 21:01:39'),
	(5, '8', 1, '2018-04-26 13:23:07', '2018-04-26 13:23:07'),
	(6, '8', 5, '2018-05-04 21:02:30', '2018-06-17 03:34:09'),
	(7, '8', 20, '2018-05-08 13:48:19', '2018-05-08 13:48:19'),
	(8, '4', 9, '2018-06-14 12:27:44', '2018-06-14 12:27:44'),
	(9, '8', 11, '2018-06-14 16:26:00', '2018-06-14 16:26:12'),
	(10, '2', 10, '2018-06-17 03:34:36', '2018-06-17 03:34:36'),
	(11, '4', 14, '2018-06-18 09:52:29', '2018-06-18 09:52:29');
/*!40000 ALTER TABLE `tables` ENABLE KEYS */;

-- Dumping structure for table betadb3.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(16) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(192) NOT NULL,
  `role_id` int(11) NOT NULL DEFAULT '2',
  `api_token` varchar(60) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`,`cart_id`),
  UNIQUE KEY `u` (`created_at`),
  KEY `fk_users_roles1_idx` (`role_id`),
  KEY `fk_users_cart1_idx` (`cart_id`),
  CONSTRAINT `fk_users_cart1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_roles1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- Dumping data for table betadb3.users: ~13 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `email`, `password`, `role_id`, `api_token`, `name`, `cart_id`, `created_at`, `updated_at`) VALUES
	(1, 'ramzi', 'i7rx480@gmail.com', 'eyJpdiI6ImpcL3BpeEVWZkJmdnZXS2NldTVYSnpBPT0iLCJ2YWx1ZSI6IlI1QnJBNG15Z1JLcWxONFJadWRkSUE9PSIsIm1hYyI6ImE4N2NkZGVjNGViMmNhMTRiN2I2ZmE4OWEyNzY2NzRjYjM3ZDBjYTkzODYzZWUwNmUzMWQxYTFhNTgyMTFkMDIifQ==', 1, '37hyEq60B64oYg3OHFk7MgolLKT6lWxWXZcowL27l8pjju6H2Xvto65RVgQ5', 'Anzo', 4, '2018-04-18 22:27:03', '2018-06-18 00:36:53'),
	(2, 'alfa', 'gravity.sama@gmail.com', '', 3, 'TzUBqEqyAkgZT9tHm1xSDY201uKH7wJDmUjys3PYu4rZ4YEwWuXXeyaeV6S3', 'romeo', 2, '2018-04-18 22:40:36', '2018-06-18 07:23:05'),
	(4, 'msi', 'stealthPro@hotmail.com', 'eyJpdiI6InBPNWxqd0ZzUmlkbEdMcG94aTNKVEE9PSIsInZhbHVlIjoiQzdpU0ZjRTZtWHNCdmFYK1ZJYTBVUT09IiwibWFjIjoiMDcwMjZkNTQxNGU1NTcxYTgxNGMxZDVmMTczNmM0ZGIyMDQ0NzdiZGY5YjU3NDBlMjZlNjkzYjNkYjE1NDZmMiJ9', 1, 'GTBf488ja4aa1rnQ0TGC8BGERiw7kXZ3a4g5ilGOmwaJkpPuIhn9tAhxmnDv', 'ali2', 3, '2018-05-08 13:30:50', '2018-06-15 01:12:49'),
	(6, 'john', 'YoAmJohn@outlook.com', 'eyJpdiI6IndhTmRZOTlCdHhMRVwvXC8zVUUzSURXdz09IiwidmFsdWUiOiJFb0pqU0p3QVNYZEFUcmcxWFhiQVhRPT0iLCJtYWMiOiI2ZTNmYTE5Y2MyMzM1ZmM0OTZkNjgzMmNkNGQ5ZTdiODJkZjAyMTNlMjRhZWMwOGJmNDljYWMyNDZhNzljOGQ2In0=', 3, 'bJy4ZZJ4kvMSpdMl6u0J3xfEIbYP71LjmTt5wvBp2SICI9Gx37Gc5gAMGX9u', 'card', 6, '2018-05-10 15:09:45', '2018-06-18 10:29:26'),
	(7, 'fares', 'a.annaba@yahoo.com', 'eyJpdiI6InZxTmNBUlVVdjJObGZGYjhwa09kM1E9PSIsInZhbHVlIjoia1VhYldcLytWOXhLMktWQkN4TjNNQ0E9PSIsIm1hYyI6IjZmMzk5ZjBhMmM3YzZiN2EzYjA5OGY3NzAyNmUxZmY4YmM4NjE1MDYyMWY1ZDVhNGMzNjdmOTcyZDRkZDI1ODIifQ==', 1, '4mWxD0TkmnsSgwGm5QH6ERYSLLDVjlPydvfOFgiDjb4E8atxwLEALrQ2J8H4', 'gerb', 1, '2018-05-12 15:30:35', '2018-06-18 10:39:58'),
	(8, 'razer', 'razoir@yahoo.fr', 'eyJpdiI6IkFQWGUzeUdvR1NZNWRpWDIyUHZ2V1E9PSIsInZhbHVlIjoieUo5aitnQ2pBWitjZkVnTVVwY2NRdz09IiwibWFjIjoiOWE4NWIxM2U4MWY2ZDY4MTJlMjM4ZGNjMWQ3ZGMzNmNkOWYxNjc3Mzk3MGUyOTI1MmZjZDQ2NGFjMTZkN2RiMSJ9', 2, 'AZFeCEaWS7sFOVuqhP1FoocvZqi3wyirr8dWIAs9Vhh5xHLpA7TMYNgOvE07', 'blade', 5, '2018-05-26 12:41:27', '2018-06-18 06:27:02'),
	(12, 'wana', 'hdhh@gmail.com', 'eyJpdiI6InhaWlQ2ejF4bU9PMCtacEhYTUp1VXc9PSIsInZhbHVlIjoibXc5Wmd4RWFnUGN4ZDd3K1B1XC9tMVE9PSIsIm1hYyI6ImQ2NTc0NjdhZTQ3ZGZiNGJjMWRiYmEyZDI5ZDU5MTZkMmIzMTMwZDA2ZjkzMmYyYTc0NTY0ZTcxM2FlMTM2NzQifQ==', 1, NULL, 'hani', 8, '2018-06-17 13:25:52', '2018-06-17 13:25:52'),
	(13, 'wanacry', 'alibatoouche97@gmail.com', 'eyJpdiI6ImhWR1F0dHJXNWw2cXlBMnUrZkVZOEE9PSIsInZhbHVlIjoic2lVVjNQUmxnS2s5bm10TEtUVE1qdz09IiwibWFjIjoiOTQ3Yjk3MmFkZDNmOGFlYmZjZGI1MjIyNDU2MTE0MDVlZDU5YjNkOTE2YTVlNzJmNmVhMTNlNjJiNzlhYjcxZiJ9', 1, 'kidOQXwMQWaNqqMKuFdIDzWPNTtFNBunwIyfaM3s70el8qcyvwuYoNfVZqAt', 'hani', 9, '2018-06-17 13:36:33', '2019-07-02 16:16:36'),
	(14, 'someth', 'rasby@gmail.com', 'eyJpdiI6IlwvMWVTWGVZQ2kyNmZEazlzSTBKMUd3PT0iLCJ2YWx1ZSI6IlVEb1wvY2hZQjFQMkdWaWNPbmNTMTRBPT0iLCJtYWMiOiI4ODBiZTYwNWUxNjkyNWMxOGNkYjllNzI1ZDJmNjYyYjJhNjQ1OWRlOWZlNmQzODZhNGQ3ZDI4OWYzYjA0OThjIn0=', 2, NULL, 'hani', 10, '2018-06-17 18:31:59', '2018-06-17 18:32:00'),
	(15, 'somethm', 'rasbky@gmail.com', 'eyJpdiI6IldlMFNkOFlhU1NNSmVhY3VDbWZ3VUE9PSIsInZhbHVlIjoiUndVWUFNaVJ4dzJiQ3RZN2xOdU1zQT09IiwibWFjIjoiYzZkYTA1OGY0YWZjOTY0NzgzMWQyNTgxMGM1NDViNGY5MDczZmQ4ZjQ1NGM4YjA3MWE5Njk3YTQ4YmNlZDQzYyJ9', 2, NULL, 'hani', 11, '2018-06-17 18:34:48', '2018-06-17 18:34:48'),
	(16, 'so1hm', 'sbky@gmail.com', 'eyJpdiI6Ijg0RE1Rd2V5WUVjUW05ZGZHR2Y4Tmc9PSIsInZhbHVlIjoiNXZEalBUT3g3VW9HTUZqaTJWekRIdz09IiwibWFjIjoiZDY5MjUyMWE0N2NiOGMyZDdkM2U0OWZiYTFiOTdlZmFiZDFmYmIwNTFmNjQwZTBmMWFkNDU4MDliNTk2NmNlNiJ9', 2, NULL, 'hani', 12, '2018-06-17 18:52:37', '2018-06-17 18:52:37'),
	(21, 'looz', 'a@gm.com', 'eyJpdiI6Imp4b2ttbnZcL2JVcjcrbWsreEE4REpnPT0iLCJ2YWx1ZSI6IjlYQWtQWXZXU21kR2JreThZdHpGSFE9PSIsIm1hYyI6IjIxNmRhODAyOGNhYzczODMyMjk1M2I2MDYxZmQ1YzY4NGQyM2E3MGI4MmVkNzgzMDA0MGQ5OGQzZjE5ZDc0ZGEifQ==', 2, '2L4a4JxbMU4cJNAMIbPrFQy8IA6SLUIHeyLlkDWWqi2bSqAYrOaB6tQWWgLI', 'looz', 17, '2018-06-18 09:57:54', '2018-06-18 09:58:08'),
	(22, 'soficlef', 'sofi252018@yahoo.gg', 'eyJpdiI6Imc2Zzl2NE53U0poRUgyTVRDMW04ZkE9PSIsInZhbHVlIjoiaHFzQTZrQUdwNUxlQlhRNEFcL1lFK0E9PSIsIm1hYyI6IjFlYTk0ZjkwNzI2MjUzMjdhYWQzYWQ5MDA4MjA3ZTMyMWMyMGNlYzIxZjc3YzE3Njc5NDdmMzFiYTEzMGM0MGMifQ==', 1, 'XRxVUornhoUAdvHpzZi3YAalgZrJPcMQuBQ8HAXXfiO8YqUIXyS8HULxjDUy', 'sofiene', 18, '2018-11-17 14:25:49', '2018-11-17 14:26:54');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Dumping structure for trigger betadb3.checkNumberOfPlaces
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `checkNumberOfPlaces` BEFORE INSERT ON `tables` FOR EACH ROW IF NEW.nbPlaces NOT IN('2','4','8') THEN DELETE FROM tables WHERE nbPlaces = NEW.nbPlaces; END IF//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger betadb3.checkNumberOfPlacesUpadte
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `checkNumberOfPlacesUpadte` BEFORE UPDATE ON `tables` FOR EACH ROW IF NEW.nbPlaces NOT IN('2','4','8') THEN DELETE FROM tables WHERE nbPlaces = NEW.nbPlaces; END IF//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger betadb3.checkposition
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `checkposition` BEFORE INSERT ON `tables` FOR EACH ROW IF NEW.position > 20 THEN DELETE FROM tables WHERE position = NEW.position; END IF//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger betadb3.checkpositionUpdate
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `checkpositionUpdate` BEFORE UPDATE ON `tables` FOR EACH ROW IF NEW.position > 20 THEN DELETE FROM tables WHERE posiotion = NEW.position; END IF//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
