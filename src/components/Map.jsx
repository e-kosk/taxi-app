import * as React from "react";
import { useState, useEffect, useContext } from "react";
import styles from "./Map.module.scss";
import { MapContainer, Marker, Circle, Popup, TileLayer, useMapEvent } from "react-leaflet";
import { MapViewHook, RoutingMachine } from "../components/MapHooks"
import { MapContext } from "../context/MapContext";


export const Map = () => {
    const {initial, from, to, userLocation} = useContext(MapContext);

    return (
        <div className={`${styles.map} leaflet-routing-container-hide`}>
        <MapContainer center={[initial.lat, initial.lon]} zoom={initial.zoom} scrollWheelZoom={true}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userLocation.lat && userLocation.lon && (
                <Circle center={[userLocation.lat, userLocation.lon]} radius={50} >
                    <Popup>
                        Your location
                    </Popup>
                </Circle>
            )
        }
        {from.coords.lat && from.coords.lon && (
                <Marker position={[from.coords.lat, from.coords.lon]}>
                    <Popup>
                        From
                    </Popup>
                </Marker>
            )
        }
        {to.coords.lat && to.coords.lon && (
                <Marker position={[to.coords.lat, to.coords.lon]}>
                    <Popup>
                        To
                    </Popup>
                </Marker>
            )
        }

        {from.coords.lat && from.coords.lon && to.coords.lat && to.coords.lon && (
            <RoutingMachine from={from} to={to}/>
        )}
        
        <MapViewHook initial={initial} from={from.coords} to={to.coords} />
        {/* <MapHooks mapCenter={addressTo.coords} /> */}
        </MapContainer>
    </div>
    )
}