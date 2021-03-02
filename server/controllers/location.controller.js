const Location = require("../models/location.model");

module.exports = {
    getAllLocations(req, res) {
        Location.find()
            .then(allEvents => res.json(allEvents))
            .catch(err => res.json(err))
    },

    getOneLocation(req, res) {
        Location.findOne({ _id: req.params.id})
            .then(oneEvent => res.json(oneEvent))
            .catch(err => res.json(err))
    },

    createLocation(req, res) {
        Location.create(req.body)
            .then(newEvent => res.json(newEvent))
            .catch(err => res.json(err))
    },

    updateLocation(req, res) {
        Location.findOneAndUpdate({ _id: req.params.id}, req.body, {new: true})
            .then(updatedEvent => res.json(updatedEvent))
            .catch(err => res.json(err))
    },
    deleteLocation(req, res) {
        Location.deleteOne({ _id: req.params.id})
            .then(deletedEvents => res.json(deletedEvents))
            .catch(err => res.json(err))
    }
}

