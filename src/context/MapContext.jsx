import { useContext, createContext, useState } from "react";

export const MapContext = createContext({
    initial: {lat: 50, lon: 19, zoom: 13}, 
    from: {address: '', coords: {lat: 0, lon: 0}}, 
    to: {address: '', coords: {lat: 0, lon: 0}}, 
    userLocation: {lat: 0, lon:0},
    cost: 0, 
    distance: 0,
    setInital: () => {},
    setFrom: () => {},
    setFo: () => {},
    setUserLocation: () => {},
    setCost: () => {},
    setDistance: () => {},
});

export const MapProvider = ({children}) => {
    const [initial, setInitial] = useState({lat: 50, lon: 19, zoom: 13})
    const [from, setFrom] = useState({address: '', coords: {lat: 0, lon: 0}})
    const [to, setTo] = useState({address: '', coords: {lat: 0, lon: 0}})
    const [userLocation, setUserLocation] = useState({lat: 0, lon:0})
    const [cost, setCost] = useState(0)
    const [distance, setDistance] = useState(0)

    return (
        <MapContext.Provider value={{
            initial: initial, 
            from: from, 
            to: to, 
            userLocation: userLocation,
            cost: cost, 
            distance: distance,
            setInitial: setInitial,
            setFrom: setFrom,
            setTo: setTo,
            setUserLocation: setUserLocation, 
            setCost: setCost, 
            setDistance: setDistance,
        }}>
            {children}
        </MapContext.Provider>
    )
}
