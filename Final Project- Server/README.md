## Final Project- Ride Bike- Server side

Welcome to the server side of the Final Project - Ride Bike. This Node.js server is developed for an internet application that includes a content management system (CMS). It allows business users to publish, edit, and delete content on their website. This README provides information on how to set up, configure, and use the server.

##### Getting Started

To start the project, follow these steps:

1. Clone the project repository from GitHub.

2. Make sure you have Node.js installed (version 18 or higher).

3. Open a terminal and navigate to the project directory.

4. Run npm i command to install the project dependencies:

##### Configuration

Open the config.js file in the project's root directory. Customize the server configuration options, such as the port number and other settings, to match your requirements.

##### Usage

To run the Node.js server, use one of the following commands:

- Production environment: npm start

- Development environment (with automatic code reloading): npm run dev

The server will start running and listen for incoming requests on the specified port. Access the server by opening a web browser and navigating to http://localhost:PORT, where PORT is the configured port number.

##### Technologies Used

- Node.js
- Express.js
- MongoDB
- bcryptjs
- chalk
- config
- cookie-parser
- cors
- cross-env
- debug
- joi
- jsonwebtoken
- lodash
- mongoose
- morgan
- multer
- nodemailer
- nodemon (devDependency)

### Available Routes

##### Users Endpoints

- Register User: POST http://localhost:8181/api/users/
- Login: POST http://localhost:8181/api/users/login
- GET All Users: GET http://localhost:8181/api/users/ (For admin users, requires a token)
- Get User: GET http://localhost:8181/api/users/:id (For registered or admin users, requires a token)
- Edit User: PUT http://localhost:8181/api/users/:id (For registered or admin users, requires a token)
- Change IsAdmin Status: PATCH http://localhost:8181/api/users/:id (For registered or admin users, requires a token)
- Delete User: DELETE http://localhost:8181/api/users/:id (For admin users, requires a token)
- Send Email Password Reset: POST http://localhost:8181/api/users/password/:email
- Password Reset: POST http://localhost:8181/api/users/password_reset/
- Contact Email: POST http://localhost:8181/api/users/sendEmail

#### Cards Endpoints

- Get all cards: GET http://localhost:8181/api/cards
- Get my cards: GET http://localhost:8181/api/cards/my-cards (For registered users, requires a token)
- Get Favorites: GET http://localhost:8181/api/cards/favorites/ (For registered users, requires a token)
- Get Card: GET http://localhost:8181/api/cards/:id
- Create new card: POST http://localhost:8181/api/cards (For admin users, requires a token)
- Edit Card: PUT http://localhost:8181/api/cards/:id (For admin users, requires a token)
- Like Card: PATCH http://localhost:8181/api/cards/:id (For registered users, requires a token)
- Delete Card: DELETE http://localhost:8181/api/cards/:id (For admin users, requires a token)
- Change business number: PATCH http://localhost:8181/api/cards/bizNumber/:id (For admin users, requires a token)

#### Created By

This project was created by Dikla Shaked as part of the Full Stack Development course.
