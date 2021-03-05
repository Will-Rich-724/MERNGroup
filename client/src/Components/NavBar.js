import {React} from "react";
import { Link } from "@reach/router";

const NavBar = (props) => {
  return (
    <div className="header">
      <div className="headerTitle">
      </div>
      <div className="navBar">

        
        <a href="https://www.google.com/search?q=blood+donation+near+me" target="_blank">
          <p>Locate a Blood Drive</p>
        </a>
        <p>|</p>
        <Link to={"/schedule"}>
          <p>Schedule an Appointment</p>
        </Link>
        <p>|</p>
        <Link to={"/appointments"}>
          <p>Your Appointments</p>
        </Link>
        <p>|</p>
        <Link  to={"/"}>
          <p>Logout</p>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
