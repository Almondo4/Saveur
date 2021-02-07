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

-- Dumping data for table betadb3.users: ~12 rows (approximately)
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

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
