import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';
import LogReg from './Views/LogReg';
import Locate from './Views/Locate'

function App() {
  return (
    <div className="App">
      <Router>
        <LogReg path='/' />
        <Locate path='/locate' />
      </Router>
    </div>
  );
}

export default App;
