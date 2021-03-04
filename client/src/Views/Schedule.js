import React, { useState, useEffect } from "react";
import { Router, Link, navigate } from "@reach/router";
import axios from "axios";

const Schedule = (props) => {
  return (
    <div>
      <h1>Where Map will be called</h1>
      {/* <LocateMap /> */}
      <label for="start">Choose a date:</label>

      <input
        type="date"
        id="dateSelect"
        name="appointment"
        value="2018-07-22"
        min="2018-01-01"
        max="2018-12-31"
      ></input>
      <label for="appt">Choose a time for your meeting:</label>

      <input
        type="time"
        id="appt"
        name="appt"
        min="09:00"
        max="18:00"
        required
      ></input>

      <small>Appointment times range from 9am to 5pm</small>
      <p>Please shcedule your appointment using a time and that works for you</p>
      <p>The Red Cross says you must wait 8 weeks between donations, so you may be turned away if within that time frame.</p>
      <p>Most donation loactions will take your blood pressure when you arrive and turn you away if your blood pressure is over 140/100</p>
    </div>
  );
};

export default Schedule;
