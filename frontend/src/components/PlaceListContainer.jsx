import React, { useEffect, useState } from "react";
import filter from "../assets/filter.png";
import { useDispatch, useSelector } from "react-redux";
import { getListings } from "../services/homesSlice";
import "../scss/PlaceListContainer.scss";
import { Link } from "react-router-dom";
import more from "../assets/more.svg";

const PlaceListContainer = () => {
    const dispatch = useDispatch();
    const { allHomes } = useSelector((state) => state.homes);
    const [img, setImg] = useState(0);

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
                    <div className="card">
                        <div className="card-img">
                            <img
                                id={`img-${home.id}`}
                                src={home.images[img].src}
                            />
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
                                    <i class="fa-solid fa-bed"></i>{" "}
                                    {home.bedroom} Bedrooms
                                </p>
                                <p>
                                    <i class="fa-solid fa-bath"></i>{" "}
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
