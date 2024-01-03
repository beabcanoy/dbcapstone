-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 03, 2024 at 03:52 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbcapstone`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `admin_id` int(11) NOT NULL,
  `admin_fname` varchar(50) NOT NULL,
  `admin_lname` varchar(50) NOT NULL,
  `admin_uname` varchar(50) NOT NULL,
  `admin_pword` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`admin_id`, `admin_fname`, `admin_lname`, `admin_uname`, `admin_pword`) VALUES
(1, 'John', 'Doe', 'JDoe', 'admin123'),
(2, 'Bev', 'Can', 'admin', 'admin123');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_employees`
--

CREATE TABLE `tbl_employees` (
  `emp_id` int(11) NOT NULL,
  `emp_fname` varchar(50) NOT NULL,
  `emp_lname` varchar(50) NOT NULL,
  `emp_img` varchar(255) NOT NULL,
  `emp_uname` varchar(100) NOT NULL,
  `emp_pword` varchar(255) NOT NULL,
  `usr_role` varchar(50) NOT NULL,
  `emp_date_registered` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_employees`
--

INSERT INTO `tbl_employees` (`emp_id`, `emp_fname`, `emp_lname`, `emp_img`, `emp_uname`, `emp_pword`, `usr_role`, `emp_date_registered`) VALUES
(1, 'a', 'a', 'profile_uploads/1704258108518_download.png', 'a', '$2y$10$i2qx2A1Ay1xiIXIaUy1M.urF73sbJpTpxgO6YeMrqUmRX3K8uS/GS', 'Employee', '2024-01-03'),
(2, 'v', 'v', 'profile_uploads/1704258335639_download.png', 'v', '$2y$10$KYutWfqpI7LquYVMz7HCceu51fBTbUHBGoLhry/mx0UtyEvn/KwM6', 'Employee', '2024-01-03'),
(3, 'k', 'k', 'profile_uploads/1704258504293_download.png', 'k', '$2y$10$weaAVC1RELpBBxiHnrHYnOlGH9ts.YwKu6dBP6VNbMpIkJO84zy/S', 'Employee', '2024-01-03');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_products`
--

CREATE TABLE `tbl_products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `product_image` varchar(255) NOT NULL,
  `product_description` text NOT NULL,
  `formula_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_products`
--

INSERT INTO `tbl_products` (`product_id`, `product_name`, `product_image`, `product_description`, `formula_id`) VALUES
(1, 'Test ', 'uploads/1699803484397_Hi-rib980-05222021.png', 'test', 1),
(2, 'test 2', 'uploads/1700759923846_tilespan.jpg', 'asasas', 1),
(3, 'test3', 'uploads/1704260924609_download.png', 'USTP', 2);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product_formulas`
--

CREATE TABLE `tbl_product_formulas` (
  `formula_id` int(11) NOT NULL,
  `formula_name` varchar(255) NOT NULL,
  `Expression` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_product_formulas`
--

INSERT INTO `tbl_product_formulas` (`formula_id`, `formula_name`, `Expression`) VALUES
(1, 'Colored', 'Actual Thickness * Density of metal * Width of raw material * Length * Pieces'),
(2, 'Steel Deck', 'Actual Thickness * Density of metal * Width of raw material * Length * Pieces'),
(3, 'Spandrell', 'Actual Thickness * Density of metal * Width of raw material  / Indicated Width * Length * Pieces'),
(4, 'test', 'test 1');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_raw_categories`
--

CREATE TABLE `tbl_raw_categories` (
  `raw_material_id` int(11) NOT NULL,
  `raw_material_categories` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_raw_categories`
--

INSERT INTO `tbl_raw_categories` (`raw_material_id`, `raw_material_categories`) VALUES
(1, 'Colored Coil 0.35MM Beige'),
(2, 'Colored Coil 0.35MM Blue'),
(3, 'Colored Coil 0.35MM Red'),
(4, 'Colored Coil 0.35MM Green'),
(5, 'Colored Coil 0.4MM White'),
(6, 'Colored Coil 0.4MM Beige'),
(7, 'Colored Coil 0.4MM Blue'),
(8, 'Colored Coil 0.4MM Red'),
(9, 'Colored Coil 0.4MM Green'),
(10, 'Colored Coil 0.5MM White'),
(11, 'Colored Coil 0.6MM Offwhite'),
(12, 'test 1');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_roll_detail`
--

CREATE TABLE `tbl_roll_detail` (
  `roll_detail_id` int(11) NOT NULL,
  `raw_material_id` int(11) NOT NULL,
  `roll_detail_no_of` int(11) NOT NULL,
  `roll_detail_netweight` int(11) NOT NULL,
  `manufacture_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_roll_detail`
--

INSERT INTO `tbl_roll_detail` (`roll_detail_id`, `raw_material_id`, `roll_detail_no_of`, `roll_detail_netweight`, `manufacture_date`) VALUES
(1, 1, 1, 2341, '2024-01-02 04:31:21'),
(2, 1, 1, 2321, '2024-01-02 04:31:21'),
(3, 1, 1, 2323, '2024-01-02 04:31:21'),
(4, 1, 1, 212, '2024-01-02 04:34:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `tbl_employees`
--
ALTER TABLE `tbl_employees`
  ADD PRIMARY KEY (`emp_id`);

--
-- Indexes for table `tbl_products`
--
ALTER TABLE `tbl_products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `formula_id` (`formula_id`);

--
-- Indexes for table `tbl_product_formulas`
--
ALTER TABLE `tbl_product_formulas`
  ADD PRIMARY KEY (`formula_id`);

--
-- Indexes for table `tbl_raw_categories`
--
ALTER TABLE `tbl_raw_categories`
  ADD PRIMARY KEY (`raw_material_id`);

--
-- Indexes for table `tbl_roll_detail`
--
ALTER TABLE `tbl_roll_detail`
  ADD PRIMARY KEY (`roll_detail_id`),
  ADD KEY `raw_material_id` (`raw_material_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_employees`
--
ALTER TABLE `tbl_employees`
  MODIFY `emp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_products`
--
ALTER TABLE `tbl_products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_product_formulas`
--
ALTER TABLE `tbl_product_formulas`
  MODIFY `formula_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_raw_categories`
--
ALTER TABLE `tbl_raw_categories`
  MODIFY `raw_material_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tbl_roll_detail`
--
ALTER TABLE `tbl_roll_detail`
  MODIFY `roll_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_products`
--
ALTER TABLE `tbl_products`
  ADD CONSTRAINT `tbl_products_ibfk_1` FOREIGN KEY (`formula_id`) REFERENCES `tbl_product_formulas` (`formula_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_roll_detail`
--
ALTER TABLE `tbl_roll_detail`
  ADD CONSTRAINT `tbl_roll_detail_ibfk_1` FOREIGN KEY (`raw_material_id`) REFERENCES `tbl_raw_categories` (`raw_material_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
