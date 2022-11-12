
<!-- TABLE OF CONTENTS -->

## Table of Contents 📋

- [Build-a-Storefront-Backend]
- [Installation Instructions]
- [Set up Database]
- [Installation]
- [Setup environment]
- [Running Ports]
- [Getting Started]
- [Run all the tests]


# Build-a-Storefront-Backend

- Project : Build a StorefrontBackend

## Installation Instructions:

- install all packages in this project :`npm install`

## Set up Database:

Create a user and the databases with the psql commands:

```
    CREATE USER store_user WITH PASSWORD '000000';
    CREATE DATABASE Store;
    CREATE DATABASE store_test;
    GRANT ALL PRIVILEGES ON DATABASE Store TO store_user;
    GRANT ALL PRIVILEGES ON DATABASE store_test TO store_user;
```

### Setup environment

create file >> .env and all the required environment variables:

```bash
# .env
ENV=dev
DB_HOST=127.0.0.1
DB_NAME=storeForedev
DB_NAME_TEST=storeFortest
DB_USER=public
DB_PASSWORD=password123
BCRYPT_PASSWORD=hi-hi
SALT_ROUNDS=10
TOKEN_SECRET=hi-friend
```

### Running Ports

After start up, the server will start on port `3000` and the database on port `5432`

## Getting Started

Start app with `npm run start`

## Run all the tests

` npm run test   `




