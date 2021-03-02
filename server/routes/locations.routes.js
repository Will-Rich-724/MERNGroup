const eventController = require("../controllers/location.controller")
const { authenticate } = require("../configs/jwt.config");
const locationController = require("../controllers/location.controller");

//add authentication to routes that will need to be protected

module.exports = app => {
    app.get("/api/locations", locationController.getAllLocations)
    app.get("/api/locations/:id", locationController.getOneLocation);
    app.post("/api/locations", locationController.createLocation);
    app.put("/api/locations/:id", locationController.updateLocation);
    app.delete("/api/locations/:id", locationController.deleteLocation);
}
