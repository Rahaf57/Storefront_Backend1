CREATE TABLE Orders(
    Order_id SERIAL PRIMARY KEY,
    user_id  bigint REFERENCES Users(id),
    product_id  bigint REFERENCES Products(id),
    quantity INT NOT NULL,
    status_order VARCHAR(50) DEFAULT 'active'

)