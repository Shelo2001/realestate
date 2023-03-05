import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    deleteProfile,
    getProfile,
    logout,
    updateProfile,
} from "../services/usersSlice";
import "../scss/Profile.scss";
import Modal from "react-modal";
import { motion } from "framer-motion";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { profile } = useSelector((state) => state.users);

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone_number, setPhone_number] = useState();

    useEffect(() => {
        dispatch(getProfile());
    }, []);

    useEffect(() => {
        if (profile?.name) {
            setName(profile.name);
            setEmail(profile.email);
            setPhone_number(profile.phone_number);
        }
    }, [profile]);

    const navigateHandler = (id) => {
        navigate(`/home/${id}`);
    };

    const logoutHandler = () => {
        dispatch(logout());
    };
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const updateProfileHandler = () => {
        const data = { id: profile.id, name, email, phone_number };
        dispatch(updateProfile(data));
    };

    const deleteAccountHandler = () => {
        setModalIsOpen(false);
        Swal.fire({
            title: "Are you sure you want to deactivate your account?",
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProfile(profile.id));
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
        });
    };

    return (
        <div className="profile-container">
            <Link to="/">
                <i class="fa-solid fa-arrow-left-long"></i> Back to home
            </Link>
            <div className="profile-header">
                <h1>Here is your profile, {profile.name}</h1>
                <div className="header-info">
                    <img
                        onClick={openModal}
                        width="90px"
                        height="90px"
                        style={{ cursor: "pointer" }}
                        src={`${import.meta.env.VITE_BASE_URL}/upload/${
                            profile.avatar
                        }`}
                    />
                    <div>
                        <p>{profile.name}</p>
                        <p>{profile.email}</p>
                    </div>
                    <div>
                        <button onClick={openModal} className="button-primary">
                            See full profile
                        </button>
                        <button
                            onClick={() => navigate("/create/listing")}
                            className="button-secondary"
                        >
                            Create new listing
                        </button>
                        <button
                            onClick={logoutHandler}
                            className="button-logout"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            <h1 style={{ textAlign: "center", color: "#1aaefd" }}>
                Your Listings
            </h1>
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Area</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {profile &&
                        profile?.home?.map((property) => (
                            <tr onClick={() => navigateHandler(property.id)}>
                                <td>{property.id}</td>
                                <td>{property.area}</td>
                                <td>{property.city}</td>
                                <td>{property.country}</td>
                                <td>{property.price} $</td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="Modal"
                overlayClassName="Overlay"
                ariaHideApp={false}
            >
                <div>
                    <h1>{profile.name}</h1>
                    <img
                        src={`${import.meta.env.VITE_BASE_URL}/upload/${
                            profile.avatar
                        }`}
                    />
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        ></input>
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        ></input>
                    </div>
                    <div>
                        <label>Phone Number</label>
                        <input
                            type="text"
                            onChange={(e) => setPhone_number(e.target.value)}
                            value={phone_number}
                        ></input>
                    </div>

                    <button className="close" onClick={closeModal}>
                        <i class="fa-solid fa-xl fa-x"></i>
                    </button>
                    <div className="button-group">
                        <button
                            onClick={deleteAccountHandler}
                            className="button-logout"
                        >
                            Delete Account
                        </button>
                        <button
                            onClick={updateProfileHandler}
                            className="button-edit"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Profile;
