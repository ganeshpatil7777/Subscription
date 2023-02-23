const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    firstName: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: String,
    flagForConsent: {
        type: String,
        required: true
    },
})

const SubscriptionDB = mongoose.model('subscriptionDB', schema)

module.exports = SubscriptionDB