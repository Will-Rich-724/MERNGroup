import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';
import LogOutButton from '../Components/LogOutButton';

const Appointments = (props) => {
    // var today = new.date(today)

    return (
        <div className='container' style={{padding: "20px"}}>
            {/* <div className='row'>
                <h1 className='col-6'>Blood Donor Pro</h1>
                <button className='col-2' style={{padding: "10px"}} onClick={(e) => navigate("/schedule")}>SCHEDULE</button>
                <button className='col-2' style={{background: "CornflowerBlue", padding: "10px"}}>APPOINTMENTS</button>
                <LogOutButton className='col-1' />
            </div> */}
            <h1>Upcoming Appointments</h1>
            {/* Nested in an if (if < var today)
            Map  */}
            <h1>Past Appointments</h1>
            {/* Map to table */}
        </div>
    )
}


export default Appointments;
