const express = require('express')
const app = express()
const http = require('http');
const axios = require('axios');
const dotenv = require('dotenv')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerPublic.json');
const swaggerAutogen = require("swagger-autogen");
const outputFile = "./swaggerPublic.json";
const endpointsFiles = ["./publicService.js"];

app.use(express.json());
dotenv.config({ path: 'config.env' })
const PASSWORD = process.env.PASSWORD

app.get('/bff/getSubscription', function (req, res) {

    if (!req.query.id) {
        axios.get('http://subscriptionservice:8081/api/subscription', {
            headers: {
                'Authorization': PASSWORD
            }
        })
            .then((response) => { res.send(response.data) })
            .catch((error) => {
                res.send(error)
            })
    } else {
        let id = req.query.id
        axios.get(`http://subscriptionservice:8081/api/subscription?id=${id}`, { headers: { 'Authorization': PASSWORD } })
            .then((response) => { res.send(response.data) })
            .catch((error) => {
                res.send(error)
            })
    }
})

app.post('/bff/createSubscription', function (req, res) {
    axios.post('http://subscriptionservice:8081/api/createSubscription', req.body, { headers: { 'Authorization': PASSWORD } })
        .then((response) => { res.send(response.data) })
        .catch((error) => {
            res.send(error)
        })
})

app.delete('/bff/deleteSubscription', function (req, res) {
    let id = req.query.id
    axios.delete(`http://subscriptionservice:8081/api/subscription?id=${id}`, { headers: { 'Authorization': PASSWORD } })
        .then((response) => { res.send(response.data) })
        .catch((error) => {
            res.send(error)
        })
})

//Swagger routes
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.listen(8082, function () {
    console.log('Subscription Public Service listening on port 8082!');
    swaggerAutogen()(outputFile, endpointsFiles, Config).then(async () => {
        await import('./publicService.js'); // Your express api project's root file where the server starts
    });
})


const Config = {
    info: {
        title: "Subscription Public API",
        description: "Subscription public API is a microservice which communicates with Subsciption Service. ",
    },
    host: `localhost:${process.env.HTTP_PORT_PUBLIC_API}`,
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
