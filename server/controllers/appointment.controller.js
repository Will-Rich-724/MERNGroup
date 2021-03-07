const Appointment = require("../models/appointment.model");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

module.exports = {
    getAllAppointments(req, res) {
        Appointment.find()
            .then(allAppointments => res.json(allAppointments))
            .catch(err => res.json(err))
    },

    getOneAppointment(req, res) {
        Appointment.findOne({ _id: req.params.id})
            .then(oneAppointment => res.json(oneAppointment))
            .catch(err => res.json(err))
    },

    createAppointment(req, res) {
        Appointment.create(req.body)
            .then(newAppointment => res.json(newAppointment))
            .catch(err => res.json(err))
    },

    updateAppointment(req, res) {
        Appointment.findOneAndUpdate({ _id: req.params.id}, req.body, {new: true})
            .then(updatedAppointment => res.json(updatedAppointment))
            .catch(err => res.json(err))
    },
    deleteAppointment(req, res) {
        Appointment.deleteOne({ _id: req.params.id})
            .then(deletedAppointments => res.json(deletedAppointments))
            .catch(err => res.json(err))
    },
    getUsersAppointments: (req, res) => {
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });

        Appointment.find({userId: new mongoose.Types.ObjectId(decodedJWT.payload._id)})
            .then((userAppointments) => {
                console.log(userAppointments);
                res.json(userAppointments)
            })
            .catch((err) => {
                console.log(`Error finding all appointments for logged in user: ${ err }`);
                res.json(err)
            });
    },
}
