import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';
import LogOutButton from '../Components/LogOutButton';

const Schedule = (props) => {
    const { location, setLocation } = props;

    // useEffect (() => {
    //     const site = $( "#location option:selected" ).text();
    //     return site;
    // }, [setLocation]);

    return (
        <div className='container' style={{padding: "20px"}}>
            <div className='row'>
                <h1 className='col-6'>Blood Donor Pro</h1>
                <button className='col-2' style={{background: "CornflowerBlue", padding: "10px"}}>SCHEDULE</button>
                <button className='col-2' style={{padding: "10px", width: "auto"}} onClick={(e) => navigate("/appointments")}>APPOINTMENTS</button>
                <LogOutButton className='col-1' />
            </div>
            <h5 style={{marginTop: "20px"}}>Please pick the donation site from the pulldown menu</h5>
            <label>
                <select id="location" name="location" input type="text" onChange={(e) => setLocation(e.target.value)}>
                    <option value="DearbornARCBDC">American Red Cross Blood Donation Center - Dearborn</option>
                    <option value="Bonfils">Bonfils Blood Center - Littleton</option>
                    <option value="ChildrensHospital">Children's Hospital Colorado Blood Donor Center - Aurora</option>
                    <option value="RiverviewRCBDC">Riverview Red Cross Blood, Platelet and Plasma Donation Center - Riverview</option>
                </select>
            </label>
            <h5 style={{marginTop: "20px"}}>Please view all appointments for $(location.name) below</h5>
            {
                console.log(location)
            }
        </div>
    )
}

export default Schedule;
