import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';

const SignUp = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    const register = e => {
        e.preventDefault();

        axios
            .post("http://localhost:8000/api/register", {
                firstName,
                lastName,
                email,
                password,
                confirmPassword
            },
                { withCredentials: true })
            .then(res => {
                console.log(res);                
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                navigate("/appointments")
            })
            .catch(err => {
                console.log(err);
                setErrors(err.response.data.errors);
            });
    };

    return (
        <div>
            <form onSubmit={register}>
                <div>
                    <label>First Name:</label>
                    <input type="text" placeholder="Enter First Name" onChange={e => setFirstName(e.target.value)} />
                    {errors.firstName ? <p>{errors.firstName.message}</p> : ""}
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" placeholder="Enter Last Name" onChange={e => setLastName(e.target.value)} />
                    {errors.lastName ? <p>{errors.lastName.message}</p> : ""}
                </div>
                <div>
                    <label>Email Address:</label>
                    <input type="email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)} />
                    {errors.email ? <p>{errors.email.message}</p> : ""}
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} />
                    {errors.password ? <p>{errors.password.message}</p> : ""}
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)} />
                    {errors.confirmPassword ? <p>{errors.confirmPassword.message}</p> : ""}
                </div>
                <input type="Submit" value="Sign Up" />
            </form>

        </div>
    )
};

export default SignUp;
