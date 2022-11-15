CREATE TABLE Orders(
    Order_id SERIAL PRIMARY KEY,
    user_id  bigint REFERENCES Users(id),
    status_order VARCHAR(50) DEFAULT 'active'
)