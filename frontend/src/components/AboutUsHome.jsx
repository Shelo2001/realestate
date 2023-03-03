import React from "react";
import "../scss/AboutUsHome.scss";

const AboutUsHome = () => {
    return (
        <div className="aboutushome">
            <div className="left">
                <h1>About Us</h1>
                <p>
                    Homeverse.io is a gated community with a great location.
                    Located downtown, you’re within walking distance of Parks,
                    and the best shopping, dining and entertainment Getting
                    around is a breeze, with easy access to freeways, buses and
                    trolleys. . Laundry is available on premises.
                </p>
                <button className="button-primary">Read More</button>
            </div>
            <div className="right">
                <div className="card">
                    <h2>500+</h2>
                    <p className="title">Projects</p>
                    <span classname="desc">
                        Over 500 lexury villas for“Home Away From Home”
                        experience
                    </span>
                </div>
                <div className="card">
                    <h2>40+</h2>
                    <p className="title">Locations</p>
                    <span classname="desc">
                        luxury villas and private holiday homes, from all across
                    </span>
                </div>
                <div className="card">
                    <h2>24/7</h2>
                    <p className="title">Help</p>
                    <span classname="desc">
                        24/7 Help service for all customers to guide and support
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AboutUsHome;
