const express = require('express')
const dotenv = require('dotenv')
const pino = require('pino-http')
const route = require('./routes/router')
const swaggerAutogen = require("swagger-autogen");
const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"];

const connectDB = require('./database/connection');

const app = express()

dotenv.config({ path: 'config.env' })

// read port and password from environment config file
const PORT = process.env.HTTP_PORT || 3000
const PASSWORD = process.env.PASSWORD

//mongoDB connection 
connectDB()

app.use(pino())
app.use(express.json());


//load router
app.use('/', isAuth, route)

//security added to subscription service routes
function isAuth(req, res, next) {
    const auth = req.headers.authorization
    if (auth === PASSWORD) {
        next()
    }
    else {
        res.send(401)
        res.send('Access forbidden')
    }
}

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
    swaggerAutogen()(outputFile, endpointsFiles, config).then(async () => {
        await import('./server.js'); // Your express api project's root file where the server starts
    });
})

const config = {
    info: {
        title: "Subscription API",
        description: "Subscription API is a microservice based app in which we have used nodejs and mangooDb as technology stack.This app is exposing api for CreateSubscription, CancelSubscription,GetAllSubscription and GetASubscription. ",
    },
    host: `localhost:${process.env.HTTP_PORT}`,
    securityDefinitions: {
        api_key: {
            type: "apiKey",
            name: "api-key",
            in: "header",
        },
    },
    schemes: ["http"],
    definitions: {
        "server side error": {
            $status: "ERROR",
            $msg: "some error message",
            error: {
                $message: "Error message caught",
                $name: "Error name",
                stack: "Error stack",
            },
        },
        "calculation": {
            $createdAt: "2020-03-31T00:00:00.000Z",
            $result: 100,
        },
    },
};







