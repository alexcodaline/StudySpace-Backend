-- продовження минулої лекції
INSERT INTO product(product, price, raiting, category, brand) VALUES('iPhone 12','1100','4.69','smartphones', 'Apple');
INSERT INTO product(product, price, raiting, category, brand) VALUES('iPhone 11','979','4.69','smartphones', 'Apple');
INSERT INTO product(product, price, raiting, category, brand) VALUES('MacBook Air,','1300','4.72','laptops', 'Apple');
INSERT INTO product(product, price, raiting, category, brand) VALUES('iPhone 14','1549','4.69','smartphones', 'Apple');
INSERT INTO product(product, price, raiting, category, brand) VALUES('iPhone 13,','1349','4.69','smartphones', 'Apple');
INSERT INTO product(product, price, raiting, category, brand) VALUES('MacBook,','950','4.69','laptops', 'Apple');


SELECT category, COUNT(product) AS Quantity FROM product GROUP BY category;
SELECT category, COUNT(DISTINCT brand) AS Quantity FROM product GROUP BY category;


CREATE TABLE customer (id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(128), productID MEDIUMINT UNSIGNED);

INSERT INTO customer(name, productID) VALUES('Mike','9');
INSERT INTO customer(name, productID) VALUES('Bob','5');
INSERT INTO customer(name, productID) VALUES('Nikola','11');
INSERT INTO customer(name, productID) VALUES('Mike','14');
INSERT INTO customer(name, productID) VALUES('Nikola','3');
INSERT INTO customer(name, productID) VALUES('Mike','8');
INSERT INTO customer(name, productID) VALUES('Mike','9');

SELECT name, COUNT(product) AS Quantity FROM customer JOIN product ON customer.productID=product.id GROUP BY name;

SELECT name, COUNT(product) AS Quantity FROM customer JOIN product ON customer.productID=product.id 
GROUP BY name ORDER BY quantity DESC;

SELECT category, product, price FROM customer JOIN product ON customer.productID = product.id 
ORDER BY category, price DESC;
-- Dump completed on 2023-10-26 15:25:44