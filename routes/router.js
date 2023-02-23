const express = require('express')
const route = express.Router()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const controller = require('../controller/controller')

//API routes
route.post('/api/createSubscription', controller.create)
route.get('/api/subscription', controller.find)
route.put('/api/subscription/', controller.update)
route.delete('/api/subscription', controller.delete)

//Swagger routes
route.use('/api-docs', swaggerUi.serve);
route.get('/api-docs', swaggerUi.setup(swaggerDocument));


module.exports = route



