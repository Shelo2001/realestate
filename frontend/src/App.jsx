import React from "react";
import "./index.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Listing from "./pages/Listing";
import All from "./pages/All";
import Profile from "./pages/Profile";
import CreateListing from "./pages/CreateListing";

function BackgroundImage() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home/all" element={<All />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/create/listing" element={<CreateListing />} />
                <Route path="/home/:id" element={<Listing />} />
            </Routes>
        </Router>
    );
}

export default BackgroundImage;
