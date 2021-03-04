import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';
import SignIn from '../Components/SignIn';
import SignUp from '../Components/SignUp';

const LogReg = (props) => {
    return(
        <div className='container' style={{marginTop: "50px"}}>
            <div className='row'>
                <SignIn className='col-4'  />
                <p className='col-4'></p>            
                <SignUp className='col-4' />
            </div>
        </div>
    )
} 

export default LogReg;
