
import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';
import LogOutButton from '../Components/LogOutButton';

const Schedule = (props) => {
    const [ location, setLocation ] = useState("American Red Cross Blood Donation Center - Dearborn");

    //Axios get 

    return (
        <div className='container' style={{padding: "20px"}}>
            {/* <div className='row'>
                <h1 className='col-6'>Blood Donor Pro</h1>
                <button className='col-2' style={{background: "CornflowerBlue", padding: "10px"}}>SCHEDULE</button>
                <button className='col-2' style={{padding: "10px", width: "auto"}} onClick={(e) => navigate("/appointments")}>APPOINTMENTS</button>
                <LogOutButton className='col-1' />
            </div> */}
            <h5 style={{marginTop: "20px"}}>Please pick the donation site from the pulldown menu</h5>
            <form>
                <select id="location" name="location" input type="text" onChange={(e) => setLocation(e.target.value)}>
                    <option value="American Red Cross Blood Donation Center - Dearborn">American Red Cross Blood Donation Center - Dearborn</option>
                    <option value="Bonfils Blood Center - Littleton">Bonfils Blood Center - Littleton</option>
                    <option value="Children's Hospital Colorado Blood Donor Center - Aurora">Children's Hospital Colorado Blood Donor Center - Aurora</option>
                    <option value="Riverview Red Cross Blood, Platelet and Plasma Donation Center - Riverview">Riverview Red Cross Blood, Platelet and Plasma Donation Center - Riverview</option>
                </select>
            </form>
            <h5 style={{marginTop: "20px"}}>Please view all appointments for {location} below</h5>
            {
                console.log(location)
            }

            {/* Map of location's apppointments */}
        </div>
    )
}

export default Schedule;
