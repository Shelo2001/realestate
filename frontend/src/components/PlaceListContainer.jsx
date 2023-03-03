import React, { useEffect } from "react";
import filter from "../assets/filter.png";
import { useDispatch, useSelector } from "react-redux";
import { getListings } from "../services/homesSlice";
import "../scss/PlaceListContainer.scss";
import { Link } from "react-router-dom";
import more from "../assets/more.svg";
import Slider from "react-slick";

const PlaceListContainer = () => {
    const dispatch = useDispatch();
    const { allHomes } = useSelector((state) => state.homes);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    useEffect(() => {
        dispatch(getListings());
    }, []);

    return (
        <div className="placelistcontainer">
            <div className="placelistcontainer-navbar">
                <button className="button-primary">
                    Filters <img src={filter} />
                </button>
            </div>
            <div className="placelistcontainer-cards">
                {allHomes.map((home) => (
                    <div key={home.id} className="card">
                        <div className="card-img">
                            <Slider
                                style={{ width: "750px", margin: "0 auto" }}
                                {...settings}
                            >
                                {home.images.map((product) => (
                                    <div key={product.id}>
                                        <img
                                            src={product.src}
                                            alt={product.alt}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        <div className="card-footer">
                            <div className="card-price">
                                <p className="price">
                                    {home.price
                                        .toString()
                                        .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            "."
                                        )}{" "}
                                    $
                                </p>
                                <Link to={`/home/${home.id}`}>
                                    <button className="button-secondary">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                            <div className="card-info">
                                <p>
                                    <i className="fa-solid fa-bed"></i>{" "}
                                    {home.bedroom} Bedrooms
                                </p>
                                <p>
                                    <i className="fa-solid fa-bath"></i>{" "}
                                    {home.bathroom} Bath
                                </p>
                                <p>{home.area} Sq ft</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="viewmore">
                <Link to={`/home/all`}>
                    <img src={more} />
                    <p>View More</p>
                </Link>
            </div>
        </div>
    );
};

export default PlaceListContainer;
