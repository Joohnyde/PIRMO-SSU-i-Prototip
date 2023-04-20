-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 20, 2023 at 01:20 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `iportal`
--

-- --------------------------------------------------------

--
-- Table structure for table `b_category`
--

CREATE TABLE `b_category` (
  `id_category` varchar(36) NOT NULL,
  `category_lang` varchar(36) NOT NULL,
  `category_lang_sh` varchar(3) NOT NULL,
  `title` varchar(255) NOT NULL,
  `tag` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `b_language`
--

CREATE TABLE `b_language` (
  `id_language` varchar(36) NOT NULL,
  `ln_name` varchar(50) NOT NULL,
  `ln_sh` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `b_post`
--

CREATE TABLE `b_post` (
  `id_post` varchar(36) NOT NULL,
  `post_lang` varchar(36) NOT NULL,
  `post_lang_sh` varchar(3) NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` longtext NOT NULL,
  `header_img_b64` longtext NOT NULL,
  `url_pid` text NOT NULL,
  `post_category` varchar(36) NOT NULL,
  `author` varchar(36) NOT NULL,
  `postid` int(11) NOT NULL,
  `time_created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id_role` varchar(36) NOT NULL,
  `title` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` varchar(36) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(128) NOT NULL,
  `email` varchar(40) NOT NULL,
  `name` varchar(32) NOT NULL,
  `surname` varchar(32) NOT NULL,
  `role_id` varchar(36) NOT NULL,
  `preferred_lang` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `b_category`
--
ALTER TABLE `b_category`
  ADD PRIMARY KEY (`id_category`),
  ADD KEY `category_lang` (`category_lang`);

--
-- Indexes for table `b_language`
--
ALTER TABLE `b_language`
  ADD PRIMARY KEY (`id_language`);

--
-- Indexes for table `b_post`
--
ALTER TABLE `b_post`
  ADD PRIMARY KEY (`id_post`),
  ADD KEY `post_lang` (`post_lang`),
  ADD KEY `b_post_ibfk_1` (`post_category`),
  ADD KEY `author` (`author`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id_role`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `preferred_lang` (`preferred_lang`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `b_category`
--
ALTER TABLE `b_category`
  ADD CONSTRAINT `b_category_ibfk_1` FOREIGN KEY (`category_lang`) REFERENCES `b_language` (`id_language`);

--
-- Constraints for table `b_post`
--
ALTER TABLE `b_post`
  ADD CONSTRAINT `b_post_ibfk_1` FOREIGN KEY (`post_category`) REFERENCES `b_category` (`id_category`),
  ADD CONSTRAINT `b_post_ibfk_2` FOREIGN KEY (`post_lang`) REFERENCES `b_language` (`id_language`),
  ADD CONSTRAINT `b_post_ibfk_3` FOREIGN KEY (`author`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id_role`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`preferred_lang`) REFERENCES `b_language` (`id_language`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
