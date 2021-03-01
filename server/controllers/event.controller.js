const Event = require("../models/event.model");

module.exports = {
    getAllEvents(req, res) {
        Event.find()
            .then(allEvents => res.json(allEvents))
            .catch(err => res.json(err))
    },

    getOneEvent(req, res) {
        Event.findOne({ _id: req.params.id})
            .then(oneEvent => res.json(oneEvent))
            .catch(err => res.json(err))
    },

    createEvent(req, res) {
        Event.create(req.body)
            .then(newEvent => res.json(newEvent))
            .catch(err => res.json(err))
    },

    updateEvent(req, res) {
        Event.findOneAndUpdate({ _id: req.params.id}, req.body, {new: true})
            .then(updatedEvent => res.json(updatedEvent))
            .catch(err => res.json(err))
    },
    deleteEvent(req, res) {
        Event.deleteOne({ _id: req.params.id})
            .then(deletedEvents => res.json(deletedEvents))
            .catch(err => res.json(err))
    }
}

