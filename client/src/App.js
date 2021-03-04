import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { Router, Link, navigate } from "@reach/router";
import axios from "axios";
import LogReg from "./Views/LogReg";
import Schedule from "./Views/Schedule";
import Appointments from "./Views/Appointments";
import Header from "./Components/Header";
import NavBar from "./Components/NavBar";
import Locate from "./Views/Locate"

function App() {
  return (
    <div className="App">
      <div className="header">
        <Header />
        <NavBar />
      </div>
      <Router>
        <LogReg path="/" />
        <Locate path="/locate" />
        <Schedule path="/schedule" />
        <Appointments path="/appointments" />
      </Router>
    </div>
  );
}

export default App;
