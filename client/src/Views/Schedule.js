import React, { useState, useEffect } from "react";
import axios from "axios";

const Schedule = (props) => {
    const [location, setLocation] = useState(
        "American Red Cross Blood Donation Center - Dearborn"
    );
    const [appointments, setAppointments] = useState([]);
    const [userId, setUserId] = useState("");
    const [errors, setErrors] = useState({});
    const [refresh, setRefresh] = useState(0);
    const { socket } = props;

    //Axios get all appointments
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/appointments")
            .then((res) => setAppointments(res.data))
            .catch((err) => {
                console.log(err);
                setErrors(err);
            });
    }, [refresh]);

    //Axois get loggged in user
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/users/user/loggedin", {
                withCredentials: true,
            })
            .then((res) => setUserId(res.data._id));
    }, []);

    useEffect(() => {
        socket.on("added_appointment_emitted", (data) => {
            console.log("in added appointments emitted");
            console.log(data.message);
            setAppointments((currentAppointments) => [
                data.newAppointment,
                ...currentAppointments,
            ]);
        });

        socket.on("claimed_appointment_omitted", (data) => {
            console.log("in claimed appointments omitted");
            console.log(data.message);
            setAppointments((currentAppointments) =>
                currentAppointments.filter((apt) => {
                    return data.removedAppointment._id !== apt._id;
                })
            );
        });
    }, [socket]);

    const takeAppointment = (e, apt) => {
        e.preventDefault();

        axios
            .put(`http://localhost:8000/api/appointment/${apt._id}`, {
                eventName: apt.eventName,
                date: apt.date,
                time: apt.time,
                userId,
            })
            .then((res) => {
                if (res.data.errors) {
                    setErrors(res.data.errors);
                } else {
                    setRefresh(refresh + 1);
                    console.log("claimed");
                    socket.emit("remove_appointment", res.data);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="container" style={{ padding: "20px" }}>
            <h5 className="prompt" style={{ marginTop: "20px" }}>
                Please pick the donation site from the pulldown menu
            </h5>
            <form>
                <select className="dropDown"
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
            <h5 className="eventName" style={{ marginTop: "20px" }}>
                All appointments available for {location}
            </h5>

            {appointments.map((appointment, index) => {
                if (
                    appointment.eventName === location &&
                    appointment.userId === null
                ) {
                    return (
                        <p
                            className="appointments"
                            key={index}
                            style={{
                                width: "750px",
                                marginTop: "20px",
                                marginLeft: "150px",
                                borderBottom: "1px solid black",
                                paddingBottom: "20px",
                            }}
                        >
                            <div className="aptDisplay">
                                <span
                                    style={{
                                        fontWeight: "bold",
                                    }}
                                >
                                    Appointment Time:
                                </span>{" "}
                                {appointment.date} at {appointment.time} 
                            </div>
                            <span>
                                {" "}
                                <button
                                    style={{
                                        background: "#1e7e34",
                                        color: "white",
                                        borderRadius: "3px",
                                        padding: "10px",
                                    }}
                                    onClick={(e) =>
                                        takeAppointment(e, appointment)
                                    }
                                >
                                    Select Appointment
                                </button>
                            </span>
                        </p>
                    );
                } else {
                    return null;
                }
            })}
        </div>
    );
};

export default Schedule;
