CREATE DATABASE  IF NOT EXISTS `online_shop` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `online_shop`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: online_shop
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productname` varchar(45) DEFAULT NULL,
  `categoryId` varchar(45) DEFAULT NULL,
  `price` varchar(45) DEFAULT NULL,
  `image` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Milk','1','5','http://127.0.0.1:8080/הורדה.jpg'),(2,'Chicken','2','20','http://127.0.0.1:8080/images (5).jpg'),(3,'Cucumber','3','3','http://127.0.0.1:8080/images (1).jpg'),(4,'Coca-cola','4','7','http://127.0.0.1:8080/images (2).jpg'),(5,'Yogurt','1','5','https://www.tnuva.co.il/uploads/f_600019cba3819_1610619339.jpg'),(6,'Cream','1','11','data:image/jpeg;base64,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'),(7,'Cheese','1','5','https://royalshop.co.il/wp-content/uploads/2020/04/f_5d009d1c1f164_1560321308.jpg'),(13,'Tomato','3','2','http://127.0.0.1:8080/images (6).jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-08 17:55:27
