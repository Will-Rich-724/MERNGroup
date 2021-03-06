const userController = require("../controllers/user.controller");
const { authenticate } = require("../configs/jwt.config");

//add authentication to routes that will need to be protected

module.exports = app => {
    app.post("/api/register", userController.register);
    app.post("/api/login", userController.login);
    app.post("/api/logout", userController.logout);

    app.get("/api/users", userController.getAllUsers);
    app.get("/api/users/user/loggedin", authenticate, userController.getLoggedInUser);
    app.get("/api/user/:id", userController.getOneUser);
    app.put("/api/user/:id", userController.updateUser);
    app.delete("/api/user/:id", userController.deleteUser)
}