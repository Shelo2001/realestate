import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../scss/CreateListing.scss";
import { createListing } from "../services/homesSlice";

const CreateListing = () => {
    const userFromStorage = JSON.parse(localStorage.getItem("user"));

    const [imageUrls, setImageUrls] = useState([""]);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [bedroom, setBedroom] = useState(0);
    const [bathroom, setBathroom] = useState(0);
    const [garage, setGarage] = useState(0);
    const [area, setArea] = useState(0);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState(0);
    const [hasCentralHeating, setHasCentralHeating] = useState(false);
    const [hasFirePlace, setHasFirePlace] = useState(false);
    const [hasLawn, setHasLawn] = useState(false);
    const [hasBikePath, setHasBikePath] = useState(false);
    const [hasCentralCooling, setHasCentralCooling] = useState(false);
    const [hasSwimmingPool, setHasSwimmingPool] = useState(false);
    const dispatch = useDispatch();

    const submitHandler = () => {
        const data = {
            hasCentralHeating,
            hasFirePlace,
            hasLawn,
            hasBikePath,
            hasCentralCooling,
            hasSwimmingPool,
            imageUrls,
            country,
            city,
            street,
            zipCode,
            bedroom,
            bathroom,
            garage,
            area,
            price,
            description,
            user_id: userFromStorage.id,
        };
        dispatch(createListing(data));
    };

    const handleAddImage = () => {
        setImageUrls([...imageUrls, ""]);
    };

    const handleImageChange = (index, url) => {
        const newImages = [...imageUrls];
        newImages[index] = url;
        setImageUrls(newImages);
    };

    return (
        <div className="listing-new">
            <div className="create-listing-container">
                <Link to="/profile">
                    <i class="fa-solid fa-arrow-left-long"></i> Back to profile
                </Link>
                <img
                    className="user-img"
                    src={`${import.meta.env.VITE_BASE_URL}/upload/${
                        userFromStorage.avatar
                    }`}
                />
            </div>
            <div className="create-listing">
                <h2>New Listing</h2>
                <div className="listing-features">
                    <div className="listing-features-left">
                        <h2>Address</h2>

                        <div>
                            <label>Country</label>
                            <input
                                onChange={(e) => setCountry(e.target.value)}
                                type="text"
                            />
                        </div>
                        <div>
                            <label>City</label>
                            <input
                                onChange={(e) => setCity(e.target.value)}
                                type="text"
                            />
                        </div>
                        <div>
                            <label>Street</label>
                            <input
                                onChange={(e) => setStreet(e.target.value)}
                                type="text"
                            />
                        </div>
                        <div>
                            <label>Zip Code</label>
                            <input
                                onChange={(e) => setZipCode(e.target.value)}
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="listing-features-right">
                        <h2>Features</h2>
                        <div>
                            <label>Bedrooms</label>
                            <input
                                onChange={(e) => setBedroom(e.target.value)}
                                type="text"
                            />
                        </div>
                        <div>
                            <label>Bathrooms</label>
                            <input
                                onChange={(e) => setBathroom(e.target.value)}
                                type="text"
                            />
                        </div>
                        <div>
                            <label>Garages</label>
                            <input
                                onChange={(e) => setGarage(e.target.value)}
                                type="text"
                            />
                        </div>
                        <div>
                            <label>Area</label>
                            <input
                                onChange={(e) => setArea(e.target.value)}
                                type="text"
                            />
                        </div>
                    </div>
                </div>
                <div className="listing-general-features">
                    <div className="price">
                        <label>Price</label>
                        <input
                            onChange={(e) => setPrice(e.target.value)}
                            type="text"
                        />
                    </div>
                    <div className="description">
                        <label>Description</label>
                        <textarea
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className="listing-img-srcs">
                    <div>
                        <label htmlFor="image-input">Image SRC</label>
                        <input
                            type="text"
                            id="image-input"
                            name="image"
                            placeholder="Enter image URL"
                            value={imageUrls[0]}
                            onChange={(e) =>
                                handleImageChange(0, e.target.value)
                            }
                        />
                    </div>
                    {imageUrls.slice(1).map((image, index) => (
                        <div key={index}>
                            <label htmlFor={`image-input-${index}`}>
                                Image SRC
                            </label>
                            <input
                                type="text"
                                id={`image-input-${index}`}
                                name="image"
                                placeholder="Enter image URL"
                                value={image}
                                onChange={(e) =>
                                    handleImageChange(index + 1, e.target.value)
                                }
                            />
                        </div>
                    ))}
                    <button className="button-primary" onClick={handleAddImage}>
                        Add More Image
                    </button>
                </div>
                <div className="additional-features">
                    <div>
                        <label>Has central heating</label>
                        <input
                            onChange={(e) =>
                                setHasCentralHeating(!hasCentralHeating)
                            }
                            type="checkbox"
                        />
                    </div>
                    <div>
                        <label>Has fire place</label>
                        <input
                            onChange={(e) => setHasFirePlace(!hasFirePlace)}
                            type="checkbox"
                        />
                    </div>
                    <div>
                        <label>Has lawn</label>
                        <input
                            onChange={(e) => setHasLawn(!hasLawn)}
                            type="checkbox"
                        />
                    </div>
                    <div>
                        <label>Has bike path</label>
                        <input
                            onChange={(e) => setHasBikePath(!hasBikePath)}
                            type="checkbox"
                        />
                    </div>
                    <div>
                        <label>Has central cooling</label>
                        <input
                            onChange={(e) =>
                                setHasCentralCooling(!hasCentralCooling)
                            }
                            type="checkbox"
                        />
                    </div>
                    <div>
                        <label>Has swimming pool</label>
                        <input
                            onChange={(e) =>
                                setHasSwimmingPool(!hasSwimmingPool)
                            }
                            type="checkbox"
                        />
                    </div>
                </div>
                <button
                    onClick={submitHandler}
                    className="button-secondary"
                    style={{
                        width: "100%",
                        marginTop: "50px",
                        marginBottom: "50px",
                    }}
                >
                    CREATE LISTING
                </button>
            </div>
            {imageUrls[0] !== "" && (
                <img className="preview-img" src={imageUrls[0]} />
            )}
        </div>
    );
};

export default CreateListing;
