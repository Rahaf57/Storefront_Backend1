# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

## Users

- ### Create/Register
  - route: /api/Users [POST]
- ### Authenticate/Login
  - route: /api/Users/authenticate [POST]

- Index [token required]
- Show [token required] 
- Create N[token required] 


## ContactInfo

- ### Create [token required]
  - route: /api/Users/  [POST]
- ### index [token required]
  - route: /api/Users/  [Get]
- ### Show [token required]
  - route: /api/Users/:id  [GET]
- ### Update [token required]
  - route: /api/Users/:id   [PATCH]
- ### Delete [token required]
  - route: /api/Users/:id [DELETE]

## Products

- Index 
- Show 
- Create [token required] 

## ContactInfo

- ### Create [token required]
  - route: /api/Product/  [POST]
- ### index 
  - route: /api/Product/  [GET]
- ### Show 
  - route: /api/Product/:id  [GET]
- ### Update 
  - route: /api/Product/:id   [PATCH]
- ### Delete 
  - route: /api/Product/:id [DELETE]



## Orders

- Current Order by user (args: user id)[token required] `'/api/Order/userOrder/:id [Get]`

## ContactInfo

- ### Create 
  - route: /api/Order/  [POST]
- ### index 
  - route: /api/Order/  [Get]
- ### Show 
  - route: /api/Order/:id  [GET]
- ### Update 
  - route: /api/Order/:id   [PATCH]
- ### Delete 
  - route: /api/Order/:id [DELETE]
- ### getUserOrder [token required]
  - route: /api/Order/userOrder/:id [Get]

  
## Data Shapes

### Users TABLE
CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(500) NOT NULL,
    lastName VARCHAR(500) NOT NULL,
    email VARCHAR(500) UNIQUE NOT NULL,
    password VARCHAR(500) NOT NULL
);

### Products TABLE
CREATE TABLE Products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

### Orders TABLE
CREATE TABLE Orders(
    Order_id SERIAL PRIMARY KEY,
    user_id  bigint REFERENCES Users(id),
    status_order VARCHAR(50) DEFAULT 'active'
)

### Order_products TABLE
CREATE TABLE order_products (
 order_id   INTEGER NOT NULL REFERENCES Orders (Order_id),
 product_id  bigint REFERENCES Products(id),
 quantity INT NOT NULL
)
