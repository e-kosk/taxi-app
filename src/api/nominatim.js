// export function getAddressFromLatLon(lat, lon) {
//     const Http = new XMLHttpRequest();
//     const url='http://nominatim.openstreetmap.org/reverse?format=json&lat='+lat+'&lon='+lon+'&zoom=27&addressdetails=1&accept-language=PL_pl';
//     Http.open("GET", url);
//     Http.send();
//     Http.onreadystatechange = (e) => {
//       var data['address'] = JSON.parse(Http.responseText)['address'];
//       var address = data['address']['road'] + ' ' + data['address']['house_number'] + ', ' + data['address']['postcode'] + ' ' + data['address']['county'];
//       callbackAddress(address);
//     }
// }

async function getAddress(lat, lon) {
    let url = 'http://nominatim.openstreetmap.org/reverse?format=json&lat='+lat+'&lon='+lon+'&zoom=27&addressdetails=1&accept-language=PL_pl';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}


export async function getAddressFromLatLon(lat, lon) {
    let address = await getAddress(lat, lon);
    console.log(address);
    document.getElementById('address_from').value=`${address.address.road} ${address.address.house_number}, ${address.address.postcode} ${address.address.county}`;
    return true;
}

export function getLatLonFromAddress(address) {
    return {lat: 50, lon: 20}
}
