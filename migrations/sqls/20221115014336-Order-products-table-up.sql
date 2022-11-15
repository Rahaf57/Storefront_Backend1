/* Replace with your SQL commands */
CREATE TABLE order_products (
 order_id   INTEGER NOT NULL REFERENCES Orders (Order_id),
 product_id  bigint REFERENCES Products(id),
 quantity INT NOT NULL
)