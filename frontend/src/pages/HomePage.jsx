import React from "react";
import Hero from "../components/Hero";
import Map from "../components/Map";
import Navbar from "../components/Navbar";
import PlaceListContainer from "../components/PlaceListContainer";
import "../scss/HomePage.scss";

const HomePage = () => {
    return (
        <div>
            <div className="homepage">
                <Navbar />
                <Hero />
            </div>
            <PlaceListContainer />

            <Map />
        </div>
    );
};

export default HomePage;
