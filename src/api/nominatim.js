export function getAddressFromLatLon(lat, lon) {
    let url = `http://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=27&addressdetails=1&accept-language=PL_pl`;
    return fetch(url).then(r=>r.json()).then(d=>{return d.address});
}

export function getLatLonFromAddress(address) {
    return {lat: 50.01, lon: 20.01}
}
