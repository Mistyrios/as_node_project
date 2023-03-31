# Axel Salem : Node JS Movie API
This project is an API for a movie website. It is a Node JS project using Express and mySQL.

## Requirements
* Docker : https://docs.docker.com/install/
* Node JS : https://nodejs.org/en/download/
* NPM : https://www.npmjs.com/get-npm

## Installation
* Clone the project where you want to install it.
* Enter in the project directory and run the command `npm install` to install the project dependencies.
* Run the container with this command to start the mySql container : 
    ```bash 
    docker run -p 3306:3306 --name hapi-mysql -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=as-node-project -d mysql:5
  ```
* Create a file named `.env` in the root of the project and copy the content of the file `.env.example` in it.
* Create a account on https://ethereal.email and copy the credentials in the file `.env` in the `mailer` object.
* Run the command `npm start` to start the project.
* For the first admin user, you should create it with the API but update his role manually in the database to `admin`.

## Usage
You can access the documentation of the API on http://localhost:3000/documentation

The endpoints of the API are :

- User endpoints :
    - POST /users/ - Create a user
    - POST /users/login - Login a user
    - GET /users - Get all users
    - GET /users/{id} - Get a user
    - PATCH /users/{id} - Update a user
    - DELETE /users/{id} - Delete a user

- Movie endpoints :
  - POST /movies/ - Create a movie
  - GET /movies - Get all movies
  - GET /movies/{id} - Get a movie
  - PATCH /movies/{id} - Update a movie
  - DELETE /movies/{id} - Delete a movie

- Favorite endpoints :
  - POST /favorite/{movieId} - Create a favorite
  - GET /favorite - Get all favorites
  - DELETE /favorite/{movieId} - Delete a favorite

