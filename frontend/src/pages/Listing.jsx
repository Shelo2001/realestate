import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import {
    getSimilarListing,
    getSingleListing,
    sendMessage,
} from "../services/homesSlice";
import "../scss/Listing.scss";
import MapForListing from "../components/MapForListing";
import Slider from "react-slick";

const Listing = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {
        home,
        similarListings,
        message: successMessage,
    } = useSelector((state) => state.homes);
    const { images } = home;
    useEffect(() => {
        dispatch(getSingleListing(id));
    }, []);
    useEffect(() => {
        if (home.city) {
            dispatch(getSimilarListing({ city: home.city, id }));
        }
    }, [home]);
    const [currentImage, setCurrentImage] = useState(0);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const sendMessageHandler = () => {
        const data = { email, name, message, owner_email: home.user.email };
        dispatch(sendMessage(data));
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
                    <MapForListing
                        address={{
                            city: home.city,
                            street: home.street,
                            country: home.country,
                        }}
                    />
                    <div className="simmilar-listing">
                        <h1>Similar Listings</h1>
                        <div className="placelistcontainer-cards">
                            {similarListings.map((home) => (
                                <div key={home.id} className="card">
                                    <div className="card-img">
                                        <Slider
                                            style={{
                                                width: "750px",
                                                margin: "0 auto",
                                            }}
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
                                            <a href={`/home/${home.id}`}>
                                                <button className="button-secondary">
                                                    View Details
                                                </button>
                                            </a>
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
                    </div>
                    <div className="owner-info">
                        <img
                            src={`${import.meta.env.VITE_BASE_URL}/upload/${
                                home.user.avatar
                            }`}
                            alt=""
                        />
                        <h2>{home.user.name}</h2>
                        {successMessage === "Email sent!" ? (
                            <div className="success">
                                Email Sent Successfuly to{" "}
                                <strong>{home.user.email}</strong>
                            </div>
                        ) : (
                            <div className="formcontainer">
                                <div>
                                    <label>Name</label>
                                    <input
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Name"
                                    />
                                </div>
                                <div>
                                    <label>Email</label>
                                    <input
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Email"
                                    />
                                </div>
                                <div>
                                    <label>Message</label>
                                    <textarea
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
                                    />
                                </div>
                                <button
                                    onClick={sendMessageHandler}
                                    className="button-primary"
                                >
                                    Send Message
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Listing;
