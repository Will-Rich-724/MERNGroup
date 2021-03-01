const eventController = require("../controllers/event.controller")
const { authenticate } = require("../configs/jwt.config");

//add authentication to routes that will need to be protected

module.exports = app => {
    app.get("/api/events", eventController.getAllEvents);
    app.get("/api/event/:id", eventController.getOneEvent);
    app.post("/api/event", eventController.createEvent);
    app.put("/api/event/:id", eventController.updateEvent);
    app.delete("/api/event/:id", eventController.deleteEvent);
}
