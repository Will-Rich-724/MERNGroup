import React, { useState, useEffect } from "react";
import { Router, Link, navigate } from "@reach/router";
import axios from "axios";
import LogOutButton from "../Components/LogOutButton";

const Appointments = (props) => {
    const [userAccount, setUserAccount] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [allAppointments, setAllAppointments] = useState([]);

    // var today = new.date(today)
    //axios get logged in user
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/users/user/loggedin", {
                withCredentials: true,
            })
            .then((res) => {
                setUserAccount(res.data._id);
                axios
                    .get(`http://localhost:8000/api/user/${res.data._id}`, {
                        withCredentials: true,
                    })
                    .then((res) => {
                        setFirstName(res.data.firstName);
                        setLastName(res.data.lastName);
                    })
                    .catch((err) => console.log(err));
                axios
                    .get(
                        "http://localhost:8000/api/appointment/usersappointments",
                        {
                            withCredentials: true,
                        }
                    )
                    .then((res) => {
                        console.log(res.data);
                        setAllAppointments(res.data);
                    })
                    .catch((err) => console.log(err));
            });
    }, []);

    const formatDate = (date, time) => {
        let [hourMin, amOrPm] = time.split(" ");
        let [hour, min] = hourMin.split(":");
        hour = parseInt(hour);
        if (amOrPm === "PM" && hour !== 12) {
            hour += 12;
        }
        if (amOrPm === "AM" && hour === 12) {
            hour = 0;
        }
        let [year, monthIndex, dayNum] = date.split("-");
        monthIndex = parseInt(monthIndex) - 1;
        return new Date(year, monthIndex, dayNum, hour, min);
    };

    const prevApt = allAppointments.filter(
        (appointment) =>
            formatDate(appointment.date, appointment.time) < new Date()
    );

    const upcomingApt = allAppointments.filter(
        (appointment) =>
            formatDate(appointment.date, appointment.time) > new Date()
    );

    return (
        <div className="container" style={{ padding: "20px" }}>
            <h3> Hi {firstName} here is a list of your appointments:</h3>
            <h1>Upcoming Appointments</h1>
            {upcomingApt.map((appointment, idx) => {
                const {eventName, date, time} = appointment

                return(
                    <div key={idx}>
                        <h2>{eventName}</h2>
                        <p>{date} {time}</p>
                    </div>
                )
            })}

            <h1>Past Appointments</h1>

            {prevApt.map((appointment, idx) => {
                const {eventName, date, time} = appointment

                return(
                    <div key={idx}>
                        <h2>{eventName}</h2>
                        <p>{date} {time}</p>
                    </div>
                )
            })}

        </div>
    );
};

export default Appointments;
