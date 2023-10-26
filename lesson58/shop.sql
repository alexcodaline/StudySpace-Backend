DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `PRODUCT` varchar(128) DEFAULT NULL,
  `Price` int DEFAULT NULL,
  `raiting` decimal(5, 2) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) LOCK TABLES `product` WRITE;

INSERT INTO
  `product`
VALUES
  ('Iphone 9', 549, 4.69, 'smartphones', 'Apple', 1),
('Iphone X', 899, 4.44, 'smartphones', 'Apple', 2),
(
    'Samsung Universe 9',
    1249,
    4.09,
    'smartphones',
    'Samsung',
    3
  ),
('OPPO F19', 280, 4.30, 'smartphones', 'OPPO', 4),
('Huawei P30', 499, 4.09, 'smartphones', 'Huawei', 5),
('MacBook Pro', 1149, 4.57, 'laptops', 'Apple', 6),
(
    'Samsung Galaxy Book',
    1499,
    4.25,
    'laptops',
    'Samsung',
    7
  ),
(
    'Microsoft Surface Laptop 4',
    1499,
    4.43,
    'laptops',
    'Microsoft Surface',
    8
  ),
('Infinix INBOOK', 1099, 4.54, 'laptops', 'Infinix', 9),
(
    'HP Pavilion 15-DK1056WM',
    1099,
    4.43,
    'laptops',
    'HP Pavilion',
    10
  );

UNLOCK TABLES;
SELECT Product, price FROM shop.product WHERE brand="Apple";
SELECT Product FROM shop.product WHERE price < "1000";
SELECT Product FROM shop.product WHERE price BETWEEN "500" AND "1500";
SELECT Product, price, rating FROM shop.product WHERE brand IN("Apple", "Samsung", "Huawei");
SELECT Product, category FROM shop.product WHERE product LIKE "Samsung%";
-- Dump completed on 2023-10-26 13:01:18