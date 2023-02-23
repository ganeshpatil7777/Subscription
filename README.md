Subscription API

Dependencies Installed 

"express": "^4.18.2",
Express - The Express philosophy is to provide small, robust tooling for HTTP servers, making it a great solution for single page applications, websites, hybrids, or public HTTP APIs.

Express is used for HTTP/Routing framework

"ava": "^5.2.0",

Ava- Ava is a framework for testing.

"dotenv": "^16.0.3",

Dotenv : This is basically used to hide all the configuration setting and secrets from commiting it. We can use this and make all secrets file as config.env locally which can be ignored from getting committed to 
   
"mongoose": "^6.9.2",
 Mongoose : This is used for using MongoDB
 
"nodemon": "^2.0.20",
nodemon: This is used for development purpose to detect the changes and rerun the application.

"pino-http": "^8.3.3",
pino-http: This is used for logging.

"swagger-autogen": "^2.23.1",
Swagger-Autogen: This is used for auto generation swagger document.

"swagger-ui-express": "^4.6.1"
Swagger-UI-Express: This is used for generating UI for swagger document.

"axios": "^1.3.3"
Axios is used to call api's


How to run the project?

npm install - to install all the dependencies mentioned above as packages
npm run start - to start the subscription microservice which has implementation of all CURD operation using MongoDB as database.
npm run start-public-api - to start public facing api i.e. backend for frontend
npm run start-email-api - to start email api which is used for sending notification message now. Implementation is not done to send email.


Install done using Docker containers
We have deployed all the microservice in seperate container and build using docker-compose file linking them together (by adding depend-on)

.config.env 
This file is used to store the configs

postman collection is added under folder called postmanCollection

Mongo DB is selected for persistence of data which can be maintain even if the docker containers are distroyed or shutdown.



