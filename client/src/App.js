import './App.css';
import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';
import io from 'socket.io-client';
import LogReg from './Views/LogReg';
import Schedule from './Views/Schedule';
import Appointments from './Views/Appointments';
import Header from "./Components/Header";
import NavBar from "./Components/NavBar";
import Admin from "./Views/Admin";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [ location, setLocation ] = useState("DearbornARCBDC");
  const [ socket ] = useState(() => io(":8000"));
  const [ socketMessage, setSocketMessage ] = useState("Connecting...");

  useEffect(() => { 

    socket.on('client_welcome', (data) => { 
        console.log(data);
        setSocketMessage(data.welcome);
        })

        return () => socket.disconnect(true);
    }, [socket])

  return (
    <div className="App">      
      <h4>{ socketMessage }</h4>
      <div className="header">
        <Header />
        <NavBar />
      </div>
      <Router>
        <LogReg path='/' />
        <Schedule path='/schedule' location = {location} setLocation = {setLocation} socket={socket} />
        <Appointments path='/appointments' socket={socket} />
        <Admin path ='/admin' socket={socket} />
      </Router>
    </div>
  );
}

export default App;
