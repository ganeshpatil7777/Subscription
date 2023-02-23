const SubscriptionDB = require('../model/model')
const axios = require('axios')

//create and save subscription along with email notification

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'Content cannot be empty !!!' })
        return
    }

    //new Subscription
    const subscription = new SubscriptionDB({
        firstName: req.body.firstName,
        email: req.body.email,
        gender: req.body.gender,
        flagForConsent: req.body.flagForConsent,
    })

    //save in database

    subscription
        .save(subscription)
        .then(
            data => {
                emailNotification()
                res.send({ id: data.id })
            }
        ).catch(error => {
            res.status(500).send({
                message: error.message || 'some error occurred while creating a subscription.'
            })
        })
}

// retrieve and return all subscriptions/ retrive and return a single subscription
exports.find = (req, res) => {
    // this is in case we need to get specific subscription
    if (req.query.id) {
        const id = req.query.id;

        SubscriptionDB.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found subscription with id " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Erro retrieving subscription with id " + id })
            })

    } else {
        SubscriptionDB.find()
            .then(subscription => {
                res.send(subscription)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving user information" })
            })
    }


}

// Update a new idetified user by subscription id
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }
    const id = req.query.id;
    SubscriptionDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update subscription information" })
        })
}

// Delete a subscription with specified subscription id in the request
exports.delete = (req, res) => {
    const id = req.query.id;

    SubscriptionDB.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "Subscription was deleted successfully!"
                })
                emailNotification()
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Subscription with id=" + id
            });
        });
}

const emailNotification = () => {
    axios.get('http://emailservice:8083/emailNotification', {})
        .then((response) => {
            console.log(response.data)
            return (response.data)
        })
        .catch((error) => {
            console.log(error.message)
        })
}