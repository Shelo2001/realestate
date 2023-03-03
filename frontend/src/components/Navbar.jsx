import React from "react";
import logo from "../assets/Vector (1).png";
import logo2 from "../assets/Vector (2).png";
import "../scss/Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <navbar className="navbar">
            <Link to="/">
                <div className="left">
                    <div>
                        <img className="logo1" src={logo} />
                        <img className="logo2" src={logo2} />
                    </div>
                    <p>Homeverse.io</p>
                </div>
            </Link>
            <div className="right">
                <Link to="/">
                    <p>Home</p>
                </Link>
                <Link to="/aboutus">
                    <p>About Us</p>
                </Link>
                <Link to="/signin">
                    <button className="button-primary">Sign In</button>
                </Link>
            </div>
        </navbar>
    );
};

export default Navbar;
