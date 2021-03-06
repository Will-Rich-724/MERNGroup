import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';

const Admin = (props) => {
    const [eventName, setEventName] = useState("American Red Cross Blood Donation Center - Dearborn")
    const [date, setDate] = useState("2021-03-14");
    const [time, setTime] = useState("10:00 AM");

    //axios create appointment
    const addAppointment = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/appointments', {
            eventName,
            date,
            time
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    return (
        <div>
            <form onSubmit={addAppointment}>
                <label>Select A Location to Add An Appointment</label>
                <br/>
                <select id="location" name="location" input type="text" onChange={(e) => setEventName(e.target.value)}>
                    <option value="American Red Cross Blood Donation Center - Dearborn">American Red Cross Blood Donation Center - Dearborn</option>
                    <option value="Bonfils Blood Center - Littleton">Bonfils Blood Center - Littleton</option>
                    <option value="Children's Hospital Colorado Blood Donor Center - Aurora">Children's Hospital Colorado Blood Donor Center - Aurora</option>
                    <option value="Riverview Red Cross Blood, Platelet and Plasma Donation Center - Riverview">Riverview Red Cross Blood, Platelet and Plasma Donation Center - Riverview</option>
                </select>
                <br/>
                <label>Add An Available Date</label>
                <br/>
                <select id="location" name="location" input type="text" onChange={(e) => setDate(e.target.value)}>
                    <option value="2021-03-14">Saturday, March 14th 2021</option>
                    <option value="2021-03-15">Sunday, March 15th 2021</option>
                    <option value="2021-03-16">Monday, March 16th 2021</option>
                    <option value="2021-03-17">Tuesday, March 17th 2021</option>
                </select>
                <br/>
                <label>Add an Available Time</label>
                <br/>
                <select id="location" name="location" input type="text" onChange={(e) => setTime(e.target.value)}>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="1:00 PM">1:00 PM</option>
                </select>
                <br/>
                <button type="submit">Add Available Appointment</button>
            </form>
        </div>
    )
}

export default Admin;