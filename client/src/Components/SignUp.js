import React, { useState, useEffect } from "react";
import { Router, Link, navigate } from "@reach/router";
import axios from "axios";
import { InputGroup, Button } from "../Utils/Utils";

const SignUp = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    const register = (e) => {
        e.preventDefault();

        axios
            .post(
                "http://localhost:8000/api/register",
                {
                    firstName,
                    lastName,
                    email,
                    password,
                    confirmPassword,
                },
                { withCredentials: true }
            )
            .then((res) => {
                console.log(res);
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            });
    };

    return (
        <div className="signUp">
            <fieldset>
                <legend>Register</legend>
                <form onSubmit={register}>
                    <InputGroup
                        label="First Name"
                        value={firstName}
                        type="text"
                        handleChange={(e) => setFirstName(e.target.value)}
                        name="firstName"
                    />
                    {errors.firstName ? (
                        <span style={{ color: "red" }}>
                            {errors.firstName.message}
                        </span>
                    ) : null}
                    <InputGroup
                        label="Last Name"
                        value={lastName}
                        type="text"
                        handleChange={(e) => setLastName(e.target.value)}
                        name="lastName"
                    />
                    {errors.lastName ? (
                        <span style={{ color: "red" }}>
                            {errors.lastName.message}
                        </span>
                    ) : null}
                    <InputGroup
                        label="Email"
                        value={email}
                        type="text"
                        handleChange={(e) => setEmail(e.target.value)}
                        name="email"
                    />
                    {errors.email ? (
                        <span style={{ color: "red" }}>
                            {errors.email.message}
                        </span>
                    ) : null}
                    <InputGroup
                        label="Password"
                        value={password}
                        type="password"
                        handleChange={(e) => setPassword(e.target.value)}
                        name="password"
                    />
                    {errors.password ? (
                        <span style={{ color: "red" }}>
                            {errors.password.message}
                        </span>
                    ) : null}
                    <InputGroup
                        label="Confirm Password"
                        value={confirmPassword}
                        type="password"
                        handleChange={(e) => setConfirmPassword(e.target.value)}
                        name="confirmPassword"
                    />
                    {errors.confirmPassword ? (
                        <span style={{ color: "red" }}>
                            {errors.confirmPassword.message}
                        </span>
                    ) : null}
                    <Button type="submit">Register</Button>
                </form>
            </fieldset>
        </div>
    );
};

export default SignUp;
