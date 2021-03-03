import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';

const SignIn = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] =useState("");

    const login = e => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/login",
            {email, password},
            {withCredentials: true}
            )
            .then(res => {
                console.log(res);
                window.open("https://www.google.com/search?q=blood+donation+near+me", "_blank");
                navigate("/schedule");
            })
            .catch(err => {
                console.log(err);
                setErrorMessage(err.response.data.msg)
            });
    };

    return(
        <form onSubmit={login}>
            <div>
                <label>Email Address:</label>
                <input type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
            </div>
            <div controlId="formBasicPassword">
                <label>Password:</label>
                <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
            </div>
            <p>{errorMessage ? errorMessage : ""} </p>
            <input type="submit" value="Sign In" />
        </form>
    )
};

export default SignIn;
