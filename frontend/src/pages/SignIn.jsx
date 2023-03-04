import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../scss/SignUp.scss";
import { useDispatch } from "react-redux";
import { login } from "../services/usersSlice";
import { Link } from "react-router-dom";

const SignIn = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUserHandler = () => {
        dispatch(login({ email, password }));
    };

    return (
        <div>
            <Navbar />
            <div className="signin-signup">
                <div className="formcontainer">
                    <h1>Homeverse.io</h1>
                    <h3>Sign in your account</h3>
                    <div>
                        <label>Email</label>
                        <input
                            type="text"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={loginUserHandler}
                        className="button-secondary"
                    >
                        Login
                    </button>
                    <hr className="line"></hr>
                    <p>
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
