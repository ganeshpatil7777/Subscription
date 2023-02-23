const express = require('express')
const app = express()

app.use(express.json());

app.get('/emailNotification', function (req, res) {
    res.send('Email send successfully')
})

app.listen(8083, function () {
    console.log('Subscription Email Notification Service listening on port 8083!');
})
