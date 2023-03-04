import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProfile, logout } from "../services/usersSlice";
import "../scss/Profile.scss";
import Modal from "react-modal";
import { motion } from "framer-motion";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { profile } = useSelector((state) => state.users);
    useEffect(() => {
        dispatch(getProfile());
    }, []);

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
    return (
        <div className="profile-container">
            <Link to="/">
                <i class="fa-solid fa-arrow-left-long"></i> Back to home
            </Link>
            <div className="profile-header">
                <h1>Here is your profile, {profile.name}</h1>
                <div className="header-info">
                    <img
                        width="90px"
                        height="90px"
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
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <img
                        src={`${import.meta.env.VITE_BASE_URL}/upload/${
                            profile.avatar
                        }`}
                    />
                    <h2>{profile.name}</h2>
                    <p>{profile.phone_number}</p>
                    <p>{profile.email}</p>
                    <p>{profile.phone_number}</p>
                    <button onClick={closeModal}>Close Modal</button>
                    <button>Delete Account</button>
                    <button>Edit</button>
                </motion.div>
            </Modal>
        </div>
    );
};

export default Profile;
