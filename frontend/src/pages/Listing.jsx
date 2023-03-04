import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import { getSingleListing } from "../services/homesSlice";
import "../scss/Listing.scss";
import MapForListing from "../components/MapForListing";

const Listing = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { home } = useSelector((state) => state.homes);
    const { images } = home;
    useEffect(() => {
        dispatch(getSingleListing(id));
    }, []);
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
        setCurrentImage(currentImage + 1);
    };

    const prevImage = () => {
        setCurrentImage(currentImage - 1);
    };
    return (
        <div>
            <Navbar />
            {home && images && (
                <div className="home-container">
                    <div className="slider">
                        <div className="active-image">
                            <img
                                src={images[currentImage].src}
                                alt={`Product Image ${currentImage + 1}`}
                            />
                        </div>
                        <div className="thumbnail-images">
                            {images.map((image, index) => (
                                <img
                                    key={image.id}
                                    src={image.src}
                                    alt={`Product Image ${index + 1}`}
                                    className={
                                        index === currentImage ? "active" : ""
                                    }
                                    onClick={() => setCurrentImage(index)}
                                />
                            ))}
                        </div>
                        <button
                            className="left-btn"
                            onClick={prevImage}
                            disabled={currentImage === 0}
                        >
                            <i class="fa-solid fa-angle-left"></i>
                        </button>
                        <button
                            className="right-btn"
                            onClick={nextImage}
                            disabled={currentImage === images.length - 1}
                        >
                            <i class="fa-solid fa-angle-right"></i>
                        </button>
                    </div>
                    <div className="home-features">
                        <p>
                            <i className="fa-solid fa-bed"></i>
                            &nbsp;&nbsp;&nbsp;{home.bedroom}
                        </p>
                        <p>
                            <i className="fa-solid fa-bath"></i>
                            &nbsp;&nbsp;&nbsp;{home.bathroom}
                        </p>
                        <p>
                            <i class="fa-solid fa-square-parking"></i>
                            &nbsp;&nbsp;&nbsp;
                            {home.garage}
                        </p>
                        <p>
                            <i class="fa-solid fa-clock"></i>
                            &nbsp;&nbsp;&nbsp;{home.created_at.substring(0, 4)}
                        </p>
                        <p>
                            <i class="fa-solid fa-square"></i>
                            &nbsp;&nbsp;&nbsp;{home.area}
                        </p>
                    </div>
                    <div className="home-description">
                        <h1>Description</h1>
                        <p>{home.description}</p>
                    </div>
                    <div className="home-detailed-features">
                        {home.hasCentralHeating ? (
                            <p>
                                <i class="fa-solid fa-check"></i> Central
                                Heating
                            </p>
                        ) : (
                            <p>
                                <i class="fa-solid fa-x"></i> Central Heating
                            </p>
                        )}
                        {home.hasFirePlace ? (
                            <p>
                                <i class="fa-solid fa-check"></i> Fire Place
                            </p>
                        ) : (
                            <p>
                                <i class="fa-solid fa-x"></i> Fire Place
                            </p>
                        )}
                        {home.hasLawn ? (
                            <p>
                                <i class="fa-solid fa-check"></i> Lawn
                            </p>
                        ) : (
                            <p>
                                <i class="fa-solid fa-x"></i> Lawn
                            </p>
                        )}
                        {home.hasBikePath ? (
                            <p>
                                <i class="fa-solid fa-check"></i> Bike Path
                            </p>
                        ) : (
                            <p>
                                <i class="fa-solid fa-x"></i> Bike Path
                            </p>
                        )}
                        {home.hasCentralCooling ? (
                            <p>
                                <i class="fa-solid fa-check"></i> Central
                                Cooling
                            </p>
                        ) : (
                            <p>
                                <i class="fa-solid fa-x"></i> Central Cooling
                            </p>
                        )}
                        {home.hasSwimmingPool ? (
                            <p>
                                <i class="fa-solid fa-check"></i> Swimming Pool
                            </p>
                        ) : (
                            <p>
                                <i class="fa-solid fa-x"></i> Swimming Pool
                            </p>
                        )}
                    </div>
                    <MapForListing />
                    <div className="simmilar-listing"></div>
                </div>
            )}
        </div>
    );
};

export default Listing;
