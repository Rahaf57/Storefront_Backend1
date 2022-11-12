[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://doryapi.herokuapp.com">
    <img src="public/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Dory </h3>

  <p align="center">
  API for Dory App
    <br />
    <h4 align="center">Give a star ⭐ if you like it ❤️  </h4>
    <br/>
    <p align="center"> 
    :link: <a href="https://doryapi.herokuapp.com">  Live </a>
    &#8226; 
   :bug: <a href="https://github.com/MohanedAshraf/Dory-API/issues">Report Bug or Request Feature</a>
    &#8226; 
    :sparkles:<a href="https://documenter.getpostman.com/view/8191338/SzS7R6zN?version=latest&fbclid=IwAR1QoQGOU_3JOGAFbKMh5PIEQ_jHG31_3OwaUPII3Vni1-oBdVjp8FSwso8">Postman Doc</a></p>

  </p>
</p>

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




