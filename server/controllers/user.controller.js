const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    register(req, res) {
        const user = new User(req.body);

        user.save()
            .then(() => {
                res.json({ msg: "success!", user: user });
            })
            .catch((err) => {
                console.log(err);
                if (err.name === "MongoError" && err.code === 11000) {
                    res.status(400).json({
                        errors: {
                            email: {
                                message:
                                    "Email is already used, please use a different email",
                            },
                        },
                    });
                }
                res.status(400).json(err);
            });
    },

    login(req, res) {
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (user === null) {
                    res.status(400).json({ msg: "invalid login attempt" });
                } else {
                    bcrypt
                        .compare(req.body.password, user.password)
                        .then((passwordIsValid) => {
                            if (passwordIsValid) {
                                res.cookie(
                                    "usertoken",
                                    jwt.sign(
                                        { _id: user._id },
                                        process.env.JWT_SECRET
                                    ),
                                    {
                                        httpOnly: true,
                                    }
                                ).json({ msg: "Success!", _id: user._id });
                            } else {
                                res.status(400).json({
                                    msg: "invalid login attempt",
                                });
                            }
                        })
                        .catch((err) =>
                            res
                                .status(400)
                                .json({ msg: "invalid login attempt " })
                        );
                }
            })
            .catch((err) => res.json(err));
    },

    logout(req, res) {
        res.cookie("usertoken", jwt.sign({ _id: "" }, process.env.JWT_SECRET), {
            httpOnly: true,
            maxAge: 0,
        }).json({ message: "ok" });
    },

    getLoggedInUser(req, res) {
        const decodedJWT = jwt.decode(req.cookies.usertoken, {
            complete: true,
        });

        User.findById(decodedJWT.payload._id)
            .then((user) => res.json(user))
            .catch((err) => res.json(err));
    },

    getAllUsers(req, res) {
        User.find()
            .then((allUsers) => res.json(allUsers))
            .catch((err) => res.json(err));
    },

    getOneUser(req, res) {
        User.findOne({ _id: req.params.id })
            .then((oneUser) => res.json(oneUser))
            .catch((err) => res.json(err));
    },

    //runValidators need to be added when model is updated
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .then((updatedUser) => res.json(updatedUser))
            .catch((err) => res.json(err));
    },

    deleteUser(req, res) {
        User.deleteOne({ _id: req.params.id })
            .then((result) => res.json(result))
            .catch((err) => res.json(err));
    },
};
