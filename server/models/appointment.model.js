const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AppointmentSchema = new mongoose.Schema(
    {
        eventName: {
            type: String,
            require: [true, "An event name is required"],
            minlength: [2, "Event Name must have at least two letters"]
        },
        date: {
            type: String,
            require: [true, "An event requires a date"],
        },
        time: {
            type: String,
            require: [true]
        },
        userId: {
            type: mongoose.Types.ObjectId
        }
    },
    { timestamp: true}
);



const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment