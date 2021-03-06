import React, { useState, useEffect } from "react";
import { Router, Link, navigate } from "@reach/router";
import axios from "axios";
import { InputGroup, Button } from "../Utils/Utils";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

    const login = e => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/login",
            {email, password},
            {withCredentials: true}
            )
            .then(res => {
                console.log(res);
                // window.open("https://www.google.com/search?q=blood+donation+near+me", "_blank");
                navigate("/schedule");
            })
            .catch(err => {
                console.log(err);
                setErrorMessage(err.response.data.msg)
            });
    };

  return (
    <div className="signIn">
      <fieldset>
        <legend>Login</legend>
        <form onSubmit={login}>
          <InputGroup
            label="Email:"
            value={email}
            type="text"
            handleChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <InputGroup
            label="Password:"
            value={password}
            type="password"
            handleChange={(e) => setPassword(e.target.value)}
            name="password"
          />

          <Button type="submit">
            Login
          </Button>
          <p>{errorMessage ? errorMessage : ""}</p>
        </form>
      </fieldset>
    </div>
  );
};

export default SignIn;
