import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "../scss/Map.scss";

const MapForListing = ({ address }) => {
    return (
        <div className="mapcontainer-listing">
            <h1>Neighborhood</h1>
            <p>
                Dream home villas {address.street}, {address.city},{" "}
                {address.country}
            </p>
            <div style={{ width: "100%", height: "60vh", margin: "0 auto" }}>
                <MapContainer
                    style={{ height: "100%", width: "100%" }}
                    center={{ lat: 41.70895, lng: 44.76401 }}
                    zoom={16}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                    />

                    <Marker position={{ lat: 41.70895, lng: 44.76401 }}>
                        <Popup>
                            {address.street}, {address.city}, {address.country}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default MapForListing;
