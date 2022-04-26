import { useMap } from "react-leaflet";
import { useContext, useState } from "react";
import { MapContext } from "../context/MapContext";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

export function MapViewHook() {
    const {initial, from, setFrom, to, setTo, userLocation, setUserLocation} = useContext(MapContext);
    const map = useMap();
    const coords = (to.coords.lat && to.coords.lon) ? 
                    [to.coords.lat, to.coords.lon] : (from.coords.lat && from.coords.lon) ? 
                    [from.coords.lat, from.coords.lon] : [initial.lat, initial.lon]
    
    if (from.coords.lat && from.coords.lon && to.coords.lat && to.coords.lon) {
        const outerBounds = [
            [from.coords.lat, from.coords.lon],
            [to.coords.lat, to.coords.lon],
        ]
        map.fitBounds(outerBounds);
    } else {
        map.panTo(coords);
        map.setZoom(16);
    }
    return null;
}

const CreateRoutineMachineLayer = (props) => {
    const {from, to, cost, distance, setCost, setDistance} = useContext(MapContext);
    // if (!(from.coords.lat && from.coords.lon && to.coords.lat && to.coords.lon)) {
    //     return L.Routing.control({})
    // }
    const instance = L.Routing.control({
        waypoints: [
            L.latLng(from.coords.lat, from.coords.lon),
            L.latLng(to.coords.lat, to.coords.lon)
        ],
        lineOptions: {
            styles: [{ color: "#6FA1EC", weight: 4 }]
        },
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        draggableWaypoints: true,
        fitSelectedRoutes: true,
        showAlternatives: false
    });
    instance.on('routesfound', async function(e) {
        var routes = e.routes;
        var summary = routes[0].summary;
        
        const tripDistance = summary.totalDistance / 1000  // distance in km
        const tripCost = tripDistance * 1.8

        setDistance(Math.round(tripDistance * 100) / 100);
        setCost(Math.round(tripCost * 100) / 100);
    });
    return instance;
};

export const RoutingMachine = createControlComponent(CreateRoutineMachineLayer);

export function LocationMarkerHook(props) {
    // const map = useMap();

    return <></>;
}