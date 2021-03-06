
import React, { useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';
import LogOutButton from '../Components/LogOutButton';

const Schedule = (props) => {
    const [ location, setLocation ] = useState("American Red Cross Blood Donation Center - Dearborn");
    const [ appointments, setAppointments] = useState([]);
    const [ userId, setUserId] = useState("");
    const [ claimedAppointment, setClaimedAppointment] = useState("");
    const [ date, setDate] = useState("");
    const [ time, setTime] = useState("");
    const [ eventName, setEventName] = useState("")
    const [ errors, setErrors] = useState({})


    //Axios get all appointments
    useEffect(() => {
        axios.get('http://localhost:8000/api/appointments')
        .then(res => setAppointments(res.data))
        .catch(err => console.log(err))
    }, [])

    //Axois get loggged in user
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/user/loggedin", {
            withCredentials: true
        })
        .then(res => setUserId(res.data._id))
    },[])

    const takeAppointment = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/appointment/${claimedAppointment}`,{
            eventName,
            date,
            time,
            userId
        })
        .then((res) =>{
            if(res.data.errors) {
                setErrors(res.data.errors);
            } else {
                console.log("claimed")
            }
        })
        .catch(err => console.log(err));

    }

    return (
        <div className='container' style={{padding: "20px"}}>
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
            
            {appointments.map((appointment, index) => {if (appointment.eventName === location && appointment.userId === null) {
                return (
                <tr key={appointment._id}>
                    <td>
                        {appointment.date}
                    </td>
                    <td>
                        {appointment.time}
                    </td>
                    <td>
                        <button onClick={(e) => {setClaimedAppointment(appointment._id) ; setEventName(appointment.eventName) ; setDate(appointment.date) ; setTime(appointment.time) ; takeAppointment(e)}}>Select Appointment</button>
                    </td>
                </tr>
            )}})}
            
        </div>
    )
}

export default Schedule;
