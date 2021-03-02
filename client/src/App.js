import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';
import LogReg from './Views/LogReg';
import Schedule from './Views/Schedule';
import Appointments from './Views/Appointments';

function App() {
  return (
    <div className="App">
      <Router>
        <LogReg path='/' />
        <Schedule path='/schedule' />
        <Appointments path='/appointments' />
      </Router>
    </div>
  );
}

export default App;
