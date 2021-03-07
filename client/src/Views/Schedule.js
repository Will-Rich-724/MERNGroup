import React, { useState, useEffect } from "react";
import { Router, Link, navigate } from "@reach/router";
import axios from "axios";
import LogOutButton from "../Components/LogOutButton";

const Schedule = (props) => {
    const [location, setLocation] = useState(
        "American Red Cross Blood Donation Center - Dearborn"
    );
    const [appointments, setAppointments] = useState([]);
    const [userId, setUserId] = useState("");
    const [claimedAppointment, setClaimedAppointment] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [eventName, setEventName] = useState("");
    const [errors, setErrors] = useState({});
    const [refresh, setRefresh] = useState(0)
    const { socket } = props;

    //Axios get all appointments
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/appointments")
            .then((res) => setAppointments(res.data))
            .catch((err) => console.log(err));
    }, [refresh]);

    //Axois get loggged in user
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/users/user/loggedin", {
                withCredentials: true,
            })
            .then((res) => setUserId(res.data._id));
    }, []);

    const takeAppointment = (e, apt) => {
        e.preventDefault();
        setClaimedAppointment(apt._id);
        setEventName(apt.eventName);
        setDate(apt.date);
        setTime(apt.time);
        axios
            .put(`http://localhost:8000/api/appointment/${apt._id}`, {
                eventname: apt.eventName,
                date: apt.date,
                time: apt.time,
                userId,
            })
            .then((res) => {
                if (res.data.errors) {
                    setErrors(res.data.errors);
                } else {
                    setRefresh(refresh + 1)
                    console.log("claimed");
                    socket.emit("claimed_appointment_omitted", res.data);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="container" style={{ padding: "20px" }}>
            <h5 style={{ marginTop: "20px" }}>
                Please pick the donation site from the pulldown menu
            </h5>
            <form>
                <select
                    id="location"
                    name="location"
                    input
                    type="text"
                    onChange={(e) => setLocation(e.target.value)}
                >
                    <option value="American Red Cross Blood Donation Center - Dearborn">
                        American Red Cross Blood Donation Center - Dearborn
                    </option>
                    <option value="Bonfils Blood Center - Littleton">
                        Bonfils Blood Center - Littleton
                    </option>
                    <option value="Children's Hospital Colorado Blood Donor Center - Aurora">
                        Children's Hospital Colorado Blood Donor Center - Aurora
                    </option>
                    <option value="Riverview Red Cross Blood, Platelet and Plasma Donation Center - Riverview">
                        Riverview Red Cross Blood, Platelet and Plasma Donation
                        Center - Riverview
                    </option>
                </select>
            </form>
            <h5 style={{ marginTop: "20px" }}>
                Please view all appointments for {location} below
            </h5>

            {appointments.map((appointment, index) => {
                if (
                    appointment.eventName === location &&
                    appointment.userId === null
                ) {
                    return (
                        <p
                            key={index}
                            style={{
                                width: "750px",
                                marginTop: "20px",
                                marginLeft: "150px",
                                borderBottom: "1px solid black",
                                paddingBottom: "20px",
                            }}
                        >
                            <span
                                style={{
                                    fontWeight: "bold",
                                    color: "Cornflowerblue",
                                }}
                            >
                                Date of Appointment:
                            </span>{" "}
                            {appointment.date} |
                            <span
                                style={{
                                    fontWeight: "bold",
                                    color: "Cornflowerblue",
                                }}
                            >
                                {" "}
                                Time of Appointment:
                            </span>{" "}
                            {appointment.time} |
                            <span>
                                {" "}
                                <button
                                    onClick={(e) =>
                                        takeAppointment(e, appointment)
                                    }
                                >
                                    Select Appointment
                                </button>
                            </span>
                        </p>
                    );
                }
            })}
        </div>
    );
};

export default Schedule;
