-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2026 at 09:15 AM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wydarzenia`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wydarzenia_historyczne`
--

CREATE TABLE `wydarzenia_historyczne` (
  `id` int(11) NOT NULL,
  `wydarzenie` varchar(255) DEFAULT NULL,
  `data_wydarzenia` int(4) DEFAULT NULL,
  `miejsce_wydarzenia` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `wydarzenia_historyczne`
--

INSERT INTO `wydarzenia_historyczne` (`id`, `wydarzenie`, `data_wydarzenia`, `miejsce_wydarzenia`) VALUES
(1, 'Bitwa pod Grunwaldem', 1410, 'Grunwald, Polska'),
(2, 'Uchwalenie Konstytucji 3 Maja', 1791, 'Warszawa, Polska'),
(3, 'Odzyskanie niepodległości przez Polskę', 1918, 'Warszawa, Polska'),
(4, 'Lądowanie na Księżycu – Apollo 11', 1969, 'Księżyc'),
(5, 'Upadek Muru Berlińskiego', 1989, 'Berlin, Niemcy'),
(6, 'Chrzest Polski', 966, 'Polska'),
(7, 'Bitwa pod Wiedniem', 1683, 'Wiedeń, Austria'),
(8, 'Rewolucja francuska – zdobycie Bastylii', 1789, 'Paryż, Francja'),
(9, 'Wybuch I wojny światowej', 1914, 'Europa'),
(10, 'Zakończenie I wojny światowej', 1918, 'Compiègne, Francja'),
(11, 'Atak na Pearl Harbor', 1941, 'Pearl Harbor, USA'),
(12, 'Początek II wojny światowej – atak Niemiec na Polskę', 1939, 'Wieluń, Polska'),
(13, 'Powstanie warszawskie – wybuch', 1944, 'Warszawa, Polska'),
(14, 'Powstanie Solidarności', 1980, 'Gdańsk, Polska');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `wydarzenia_historyczne`
--
ALTER TABLE `wydarzenia_historyczne`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `wydarzenia_historyczne`
--
ALTER TABLE `wydarzenia_historyczne`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
