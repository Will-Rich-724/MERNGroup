const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const EventSchema = new mongoose.Schema(
    {
        eventName: {
            type: String,
            require: [true, "An event name is required"],
            minlength: [2, "Event Name must have at least two letters"]
        },
        address: {
            type: String,
            require: [true, "An event requires an address"],
        },
        city: {
            type: String,
            require: [true, "An event requires a city"],
        },
        zipCode: {
            type: Number,
            require: [true, "An event requires a zip code"],
        },
        state: {
            type: String,
            require: [true, "An event requires a state"],
        },
        date: {
            type: Date,
            require: [true, "An event requires a date"],
        },
        
    },
    { timestamp: true}
);



const Event = mongoose.model("Event", EventSchema);

module.exports = Event