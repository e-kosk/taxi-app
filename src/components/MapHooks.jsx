import { useMap } from "react-leaflet";

export function MapHooks(props) {
    const map = useMap();
    map.panTo([props.mapCenter.lat, props.mapCenter.lon]);
    return null;
}