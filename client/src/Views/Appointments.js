import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';
import LogOutButton from '../Components/LogOutButton';

const Appointments = (props) => {
    const [ userAccount, setUserAccount ] = useState("");
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ allAppointments, setAllAppointments ] = useState([]);

    // var today = new.date(today)
    //axios get logged in user
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/user/loggedin", {
            withCredentials: true
        })
        .then(res => setUserAccount(res.data._id))
    },[]);

    //axios get logged in users info
    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${userAccount}`, {
            withCredentials: true
        })
        .then(res => {
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName)
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get("http:localhost:8000/api/appoinment/usersappointments", {
            withCredentials: true
        })
        .then(res => setAllAppointments(res.data))
        .catch(err => console.log(err))
    }, [])

    return (
        <div className='container' style={{padding: "20px"}}>
            <h3> Hi {firstName} here is a list of your appointments:</h3>
            <h1>Upcoming Appointments</h1>
            {/* Nested in an if (if < var today)
            Map  */}
            <h1>Past Appointments</h1>
            {/* Map to table */}
        </div>
    )
}


export default Appointments;
