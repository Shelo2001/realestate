import React, { useEffect } from "react";
import filter from "../assets/filter.png";
import { useDispatch, useSelector } from "react-redux";
import { getListings } from "../services/homesSlice";
import "../scss/PlaceListContainer.scss";
import { Link } from "react-router-dom";
import more from "../assets/more.svg";
import Slider from "react-slick";
import Navbar from "../components/Navbar";

const All = () => {
    return (
        <div>
            <Navbar />
        </div>
    );
};

export default All;
