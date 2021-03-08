import React, { useState, useEffect } from "react";
import axios from "axios";

const Appointments = (props) => {
    const [userAccount, setUserAccount] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [allAppointments, setAllAppointments] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const { socket } = props;

    useEffect(() => {
        socket.on("claimed_appointment_omitted", (data) => {
            setAllAppointments(
                allAppointments.filter((appointment) => {
                    return appointment._id !== data.claimedAppointment._id;
                })
            );
        });

        socket.on("added_appointment_emitted", (data) => {
            setAllAppointments([data.addAppointment, ...allAppointments]);
        });
    }, [allAppointments, socket]);

    // var today = new.date(today)
    //axios get logged in user
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/users/user/loggedin", {
                withCredentials: true,
            })
            .then((res) => {
                setUserAccount(res.data._id);
                console.log(userAccount);
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
    }, [refresh, setLastName, setUserAccount, userAccount]);

    const deleteApt = (id) => {
        axios
            .delete(`http://localhost:8000/api/appointment/${id}`)
            .then((res) => {
                setRefresh(refresh + 1);
                console.log("Response: ", res);
            })
            .catch((err) => console.log("Error: ", err));
    };

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
            <h3> Hi {firstName} {lastName}, here is a list of your appointments:</h3>
            
            <h1 style={{color: "#228B22"}}>Upcoming Appointments</h1>
            {upcomingApt.map((appointment, idx) => {
                const { eventName, date, time} = appointment;

                return (
                    <div 
                        key={idx}
                        style={{
                            width: "750px",
                            marginTop: "20px",
                            marginLeft: "150px",
                            borderBottom: "1px solid black",
                            paddingBottom: "5px",
                        }}>
                        <h5>{eventName}</h5>
                        <p>
                        <span
                                style={{
                                    fontWeight: "bold",
                                    color: "Cornflowerblue",
                                }}
                            >
                                Date of Appointment:
                        </span>{" "}{date} |
                        <span
                            style={{
                                fontWeight: "bold",
                                color: "Cornflowerblue",
                            }}
                        >
                            {" "}
                            Time of Appointment:
                        </span>{" "}{time} |
                        <span>
                            {" "}
                            <button style={{background: "#FF6347", color: "white", borderRadius: "3px", padding: "10px"}} onClick={() => deleteApt(appointment._id)}>
                                Remove Appointment
                            </button>
                        </span>
                        </p>
                    </div>
                );
            })}

            <h1 style={{color: "#228B22"}}>Past Appointments</h1>

            {prevApt.map((appointment, idx) => {
                const { eventName, date, time } = appointment;

                return (
                    <div 
                        key={idx}
                        style={{
                            width: "750px",
                            marginTop: "20px",
                            marginLeft: "150px",
                            borderBottom: "1px solid black",
                            paddingBottom: "5px",
                        }}>
                        <h5>{eventName}</h5>
                        <p>
                        <span
                                style={{
                                    fontWeight: "bold",
                                    color: "Cornflowerblue",
                                }}
                            >
                                Date of Appointment:
                        </span>{" "}{date} |
                        <span
                            style={{
                                fontWeight: "bold",
                                color: "Cornflowerblue",
                            }}
                        >
                            {" "}
                            Time of Appointment:
                        </span>{" "}{time} |
                        <span>
                            {" "}
                            <button style={{background: "#FF6347", color: "white", borderRadius: "3px", padding: "10px"}} onClick={() => deleteApt(appointment._id)}>
                                Remove Appointment
                            </button>
                        </span>
                        </p>
                    </div>
                );
            })}

        </div>
    );
};

export default Appointments;
