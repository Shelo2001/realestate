import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../scss/SignUp.scss";
import { useDispatch } from "react-redux";
import { registerUser } from "../services/usersSlice";
import { Link } from "react-router-dom";

const SignUp = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [phone_number, setPhone_number] = useState("");
    const [password, setPassword] = useState("");

    const changeHandler = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = (file) => {
            setAvatar(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const registerUserHandler = () => {
        dispatch(registerUser({ name, email, avatar, phone_number, password }));
    };

    return (
        <div>
            <Navbar />
            <div className="signin-signup">
                <div className="formcontainer">
                    <h1>Homeverse.io</h1>
                    <h3>Create your account</h3>
                    {avatar && (
                        <img
                            style={{ borderRadius: "50px" }}
                            width="70px"
                            height="70px"
                            src={avatar}
                        />
                    )}
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="text"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="fileAppearance" for="avatar">
                            Upload Avatar
                        </label>
                        <input
                            onChange={changeHandler}
                            id="avatar"
                            accept="image/*"
                            type="file"
                        />
                    </div>
                    <div>
                        <label>Phone Number</label>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            onChange={(e) => setPhone_number(e.target.value)}
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
                        onClick={registerUserHandler}
                        className="button-secondary"
                    >
                        Register
                    </button>
                    <hr className="line"></hr>
                    <p>
                        Allready have an account?{" "}
                        <Link to="/signin">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
