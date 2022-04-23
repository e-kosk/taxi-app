function parseAddress(data) {
    if (data.road) {
        return `${data.road || ''} ${data.house_number || ''}, ${data.postcode || ''} ${data.county || ''}`
    } else if (data.residential) {
        return `${data.residential || ''}, ${data.postcode || ''} ${data.county || ''}`
    }
}

export function getAddressFromLatLon(lat, lon) {
    let url = `http://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=27&addressdetails=1&accept-language=PL_pl`;
    return fetch(url).then(r=>r.json()).then(d=>{console.log(d); return parseAddress(d.address)});
}

export function getLatLonFromAddress(address) {
    let url = `https://nominatim.openstreetmap.org/search?q=${address}&format=json&addressdetails=1`
    return fetch(url).then(r=>r.json()).then(d=>{console.log(d); return d.length > 0 ? {lat: d[0].lat, lon: d[0].lon} : {lat: 0, lon: 0}});
}
