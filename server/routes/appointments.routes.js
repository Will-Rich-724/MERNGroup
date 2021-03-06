const appointmentController = require("../controllers/appointment.controller");
const { authenticate } = require("../configs/jwt.config");

module.exports = app => {
    app.get("/api/appointments", appointmentController.getAllAppointments)
    app.get("/api/appointments/:id", appointmentController.getOneAppointment);
    app.post("/api/appointments", appointmentController.createAppointment);
    app.put("/api/appointment/:id", appointmentController.updateAppointment);
    app.delete("/api/appointment/:id", appointmentController.deleteAppointment);

    app.get('/api/appoinment/usersappointments', authenticate, appointmentController.getUsersAppointments);
}