import React from "react";
import logo from "../assets/Vector (1).png";
import logo2 from "../assets/Vector (2).png";
import "../scss/Navbar.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../services/usersSlice";

const Navbar = () => {
    const userFromStorage = JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };

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
                {userFromStorage ? (
                    <>
                        <Link to="/profile">
                            <img
                                style={{
                                    boxShadow:
                                        " 0px 0px 25px 0px rgba(255, 255, 255, 0.75)",
                                    WebkitBoxShadow:
                                        " 0px 0px 25px 0px rgba(255, 255, 255, 0.75)",
                                    MozBoxShadow:
                                        "0px 0px 25px 0px rgba(255, 255, 255, 0.75)",
                                    borderRadius: "50px",
                                }}
                                width="60px"
                                height="60px"
                                src={`${import.meta.env.VITE_BASE_URL}/upload/${
                                    userFromStorage.avatar
                                }`}
                            />
                        </Link>
                        <button
                            onClick={logoutHandler}
                            className="button-logout"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/signin">
                        <button className="button-primary">Sign In</button>
                    </Link>
                )}
            </div>
        </navbar>
    );
};

export default Navbar;
