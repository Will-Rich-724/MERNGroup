import './App.css';
import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';
import LogOutButton from './Components/LogOutButton';
import LogReg from './Views/LogReg';
import Schedule from './Views/Schedule';
import Appointments from './Views/Appointments';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [ location, setLocation ] = useState("DearbornARCBDC");

  return (
    <div className="App">
      <LogOutButton />
      <Router>
        <LogReg path='/' />
        <Schedule path='/schedule' location = {location} setLocation = {setLocation} />
        <Appointments path='/appointments' />
      </Router>
    </div>
  );
}

export default App;
