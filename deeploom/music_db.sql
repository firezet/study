-- phpMyAdmin SQL Dump
-- version 4.4.6.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 26, 2015 at 06:06 PM
-- Server version: 10.0.19-MariaDB-log
-- PHP Version: 5.6.9-pl0-gentoo

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `music_db`
--
CREATE DATABASE IF NOT EXISTS `music_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `music_db`;

-- --------------------------------------------------------

--
-- Table structure for table `albumartist`
--

CREATE TABLE IF NOT EXISTS `albumartist` (
  `albumid` int(11) NOT NULL,
  `artistid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `albumartist`
--

INSERT INTO `albumartist` (`albumid`, `artistid`) VALUES
(1, 1),
(2, 16),
(3, 15),
(4, 17),
(5, 18),
(6, 18),
(7, 18);

-- --------------------------------------------------------

--
-- Table structure for table `albums`
--

CREATE TABLE IF NOT EXISTS `albums` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `year` int(10) unsigned NOT NULL,
  `genre` int(11) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `wiki` varchar(255) DEFAULT NULL,
  `discogs` varchar(255) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `albums`
--

INSERT INTO `albums` (`id`, `name`, `year`, `genre`, `comment`, `wiki`, `discogs`) VALUES
(1, 'Пиромания', 2003, 1, NULL, NULL, 'discogs.com/Various-Sprite-%D0%9F%D0%B8%D1%80%D0%BE%D0%BC%D0%B0%D0%BD%D0%B8%D1%8F/release/1794129'),
(2, 'Utopia', 2009, 1, NULL, 'wikipedia.org/wiki/Utopia_(Axxis_album)', 'discogs.com/Axxis-Utopia/master/402166'),
(3, 'Письмо из бутылки', 2012, 2, NULL, NULL, NULL),
(4, 'Страшная сказка', 2010, 2, NULL, NULL, NULL),
(5, 'The 2nd Law', 2012, 1, NULL, 'wikipedia.org/wiki/The_2nd_Law', 'discogs.com/Muse-The-2nd-Law/master/475177'),
(6, 'Black Holes and Revelations', 2006, 1, NULL, NULL, NULL),
(7, 'The Resistance', 2009, 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `artists`
--

CREATE TABLE IF NOT EXISTS `artists` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `wiki` varchar(255) DEFAULT NULL,
  `discogs` varchar(255) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `artists`
--

INSERT INTO `artists` (`id`, `name`, `wiki`, `discogs`) VALUES
(1, 'Sprite', NULL, NULL),
(2, 'МультFильмы', NULL, NULL),
(3, 'Седьмой Прохожий', NULL, NULL),
(4, 'Найк Борзов', NULL, NULL),
(5, 'Магнитная Аномалия', NULL, NULL),
(6, 'Кукрыниксы', NULL, NULL),
(7, 'Сегодня Ночью', NULL, NULL),
(8, 'Смысловые Галлюцинации', NULL, NULL),
(9, 'Сплин', NULL, NULL),
(10, 'Zемфира', NULL, NULL),
(11, 'БИ-2', NULL, NULL),
(12, 'Король И Шут', NULL, NULL),
(13, 'Ленинград', NULL, NULL),
(14, 'Мумий Тролль', NULL, NULL),
(15, 'Green Crow', NULL, NULL),
(16, 'Axxis', 'wikipedia.org/wiki/Axxis', 'discogs.com/artist/253713-Axxis-2'),
(17, 'Канцлер Ги', NULL, NULL),
(18, 'Muse', 'wikipedia.org/wiki/Muse_(band)', 'discogs.com/artist/1003-Muse');

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE IF NOT EXISTS `genres` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`id`, `name`) VALUES
(1, 'Rock'),
(2, 'Folk');

-- --------------------------------------------------------

--
-- Table structure for table `trackartist`
--

CREATE TABLE IF NOT EXISTS `trackartist` (
  `trackid` int(11) NOT NULL,
  `artistid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `trackartist`
--

INSERT INTO `trackartist` (`trackid`, `artistid`) VALUES
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(5, 6),
(6, 7),
(7, 8),
(8, 9),
(9, 10),
(10, 11),
(11, 12),
(12, 13),
(13, 14);

-- --------------------------------------------------------

--
-- Table structure for table `tracks`
--

CREATE TABLE IF NOT EXISTS `tracks` (
  `id` int(11) NOT NULL,
  `number` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `album` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tracks`
--

INSERT INTO `tracks` (`id`, `number`, `name`, `comment`, `album`) VALUES
(1, 1, 'Мама', NULL, 1),
(2, 2, 'Сделайте громче', NULL, 1),
(3, 3, 'Ангел и змея', NULL, 1),
(4, 4, 'Изумруды', NULL, 1),
(5, 5, 'Столкновения', NULL, 1),
(6, 6, 'Город спит', NULL, 1),
(7, 7, 'Пока это кажется важным', NULL, 1),
(8, 8, 'Новые люди', NULL, 1),
(9, 9, 'Web Girl', NULL, 1),
(10, 10, 'Вечная любовь', 'римейк песни Агаты Кристи', 1),
(11, 11, 'Генрих и смерть', NULL, 1),
(12, 12, 'Money', NULL, 1),
(13, 13, 'Обещания', NULL, 1),
(14, 1, 'Ирландский бродяга', NULL, 3),
(15, 2, 'Лесной аромат', NULL, 3),
(16, 3, 'Матросы', NULL, 3),
(17, 4, 'Я не буду больше пить', NULL, 3),
(18, 5, 'Сбей меня с ног', NULL, 3),
(19, 6, 'Сундук мертвеца', NULL, 3),
(20, 7, 'Поминки Финнегана', NULL, 3),
(21, 8, 'Мой сын Джон', NULL, 3),
(22, 9, 'Болен', NULL, 3),
(23, 10, 'Каррикфергус', NULL, 3),
(24, 11, 'Биг Бау Вау', NULL, 3),
(25, 12, 'Фиддлерс Грин', NULL, 3),
(26, 2, 'Utopia', NULL, 2),
(27, 3, 'Last Man On Earth', NULL, 2),
(28, 4, 'Fass Mich An', NULL, 2),
(29, 5, 'Sarah Wanna Die', NULL, 2),
(30, 6, 'My Fathers'' Eyes', NULL, 2),
(31, 7, 'The Monsters Crawl', NULL, 2),
(32, 8, 'Eyes Of A Child', NULL, 2),
(33, 9, 'Heavy Rain', NULL, 2),
(34, 10, 'For You I Will Die', NULL, 2),
(35, 11, 'Underworld', NULL, 2),
(36, 13, '20 Years Anniversary Song', 'Exclusive Bonus Track', 2),
(37, 12, 'Taste My Blood', 'Exclusive Bonus Track', 2),
(38, 1, 'Journey To Utopia', NULL, 2),
(39, 1, 'Intro', NULL, 4),
(40, 2, 'Ezzelino', NULL, 4),
(41, 3, 'Письмо Тирана Римини Папе Римскому', NULL, 4),
(42, 4, 'Due Angeli', NULL, 4),
(43, 5, 'Canzone Di Azzo', NULL, 4),
(44, 6, 'Folker''s Song', NULL, 4),
(45, 7, 'Цыганская', NULL, 4),
(46, 8, 'Полынь И Ковыль', NULL, 4),
(47, 9, 'Плач Гильгамеша Об Энкиду', NULL, 4),
(48, 10, 'Король Воздуха', NULL, 4),
(49, 11, 'Страшная Сказка', NULL, 4),
(50, 12, 'Дикая Охота', NULL, 4),
(51, 13, 'Плач Гильгамеша Об Энкиду', 'Electro Version', 4),
(52, 1, 'Supremacy', NULL, 5),
(53, 2, 'Madness', NULL, 5),
(54, 3, 'Panic Station', NULL, 5),
(55, 4, 'Prelude', NULL, 5),
(56, 5, 'Survival', NULL, 5),
(57, 6, 'Follow Me', NULL, 5),
(58, 7, 'Animals', NULL, 5),
(59, 8, 'Explorers', NULL, 5),
(60, 8, 'Big Freeze', NULL, 5),
(61, 10, 'Save Me', NULL, 5),
(62, 11, 'Liquid State', NULL, 5),
(63, 12, 'The 2nd Law: Unsustainable', NULL, 5),
(64, 13, 'The 2nd Law: Isolated System', NULL, 5),
(65, 1, 'Take A Bow', NULL, 6),
(66, 2, 'Starlight', NULL, 6),
(67, 3, 'Supermassive Black Hole', NULL, 6),
(68, 4, 'Map Of Problematique', NULL, 6),
(69, 5, 'Soldier''s Poem', NULL, 6),
(70, 6, 'Invincible', NULL, 6),
(71, 7, 'Assassin', NULL, 6),
(72, 8, 'Exo-Politics', NULL, 6),
(73, 9, 'City Of Delusion', NULL, 6),
(74, 10, 'Hoodoo', NULL, 6),
(75, 11, 'Knights Of Cydonia', NULL, 6),
(76, 1, 'Uprising', NULL, 7),
(77, 2, 'Resistance', NULL, 7),
(78, 3, 'Undisclosed Desires', NULL, 7),
(79, 4, 'United States Of Eurasia', NULL, 7),
(80, 5, 'Guiding Light', NULL, 7),
(81, 6, 'Unnatural Selection', NULL, 7),
(82, 7, 'MK Ultra', NULL, 7),
(83, 8, 'I Belong To You', NULL, 7),
(84, 9, 'Exogenesis: Symphony Part 1', NULL, 7),
(85, 10, 'Exogenesis: Symphony Part 2', NULL, 7),
(86, 11, 'Exogenesis: Symphony Part 3', NULL, 7);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `albumartist`
--
ALTER TABLE `albumartist`
  ADD PRIMARY KEY (`albumid`,`artistid`),
  ADD KEY `albumartist_ibfk_1` (`artistid`);

--
-- Indexes for table `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`id`),
  ADD KEY `genre` (`genre`);

--
-- Indexes for table `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trackartist`
--
ALTER TABLE `trackartist`
  ADD PRIMARY KEY (`trackid`,`artistid`),
  ADD KEY `artistid` (`artistid`);

--
-- Indexes for table `tracks`
--
ALTER TABLE `tracks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `album` (`album`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `albums`
--
ALTER TABLE `albums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `artists`
--
ALTER TABLE `artists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tracks`
--
ALTER TABLE `tracks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=87;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `albumartist`
--
ALTER TABLE `albumartist`
  ADD CONSTRAINT `albumartist_ibfk_1` FOREIGN KEY (`artistid`) REFERENCES `artists` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `albumartist_ibfk_2` FOREIGN KEY (`albumid`) REFERENCES `albums` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `albums`
--
ALTER TABLE `albums`
  ADD CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`genre`) REFERENCES `genres` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `trackartist`
--
ALTER TABLE `trackartist`
  ADD CONSTRAINT `trackartist_ibfk_1` FOREIGN KEY (`trackid`) REFERENCES `tracks` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `trackartist_ibfk_2` FOREIGN KEY (`artistid`) REFERENCES `artists` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `tracks`
--
ALTER TABLE `tracks`
  ADD CONSTRAINT `tracks_ibfk_1` FOREIGN KEY (`album`) REFERENCES `albums` (`id`) ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
