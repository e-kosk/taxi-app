import * as React from "react";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getAddressFromLatLon, getLatLonFromAddress } from "../api/nominatim";
import Loading from "../components/Loading";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "./Home.module.scss";
import Trip from "../components/Trip";
import Rate from "../components/Rate";
import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from "react-leaflet";
import { MapHooks } from "../components/MapHooks"

const name = "James";
const jobTitle = "Taxi Driver";

const car = {
  make: "Toyota Colorlla",
  id: "KR 4FY7A",
  color: "white",
};

function Home() {
  const [addressFrom, setAddressFrom] = useState({
    address: "",
    coords: { lat: 0, lon: 0 },
  });
  const [addressTo, setAddressTo] = useState({
    address: "",
    coords: { lat: 0, lon: 0 },
  });
  const [isSearching, setIsSearching] = useState(false);
  const [stepOne, setStepOne] = useState(true);
  const [driverFound, setDriverFound] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  function handleInputFrom(e) {
    const newAddress = { ...addressFrom, address: e.target.value };
    setAddressFrom(newAddress);
  }

  function handleInputTo(e) {
    const newAddress = { ...addressTo, address: e.target.value };
    setAddressTo(newAddress);
  }

  function order() {
    setIsSearching(true);
  }

  function stopSearching() {
    setIsSearching(false);
    setDriverFound(true);
  }

  function handleBlurFrom(e) {
    const latLon = getLatLonFromAddress(addressFrom.address);
    const newAddress = { ...addressFrom, coords: latLon };
    setAddressFrom(newAddress);
  }

  function handleBlurTo(e) {
    const latLon = getLatLonFromAddress(addressTo.address);
    const newAddress = { ...addressTo, coords: latLon };
    setAddressTo(newAddress);
  }

  const getCoords = async () => {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    let addressText
    try {
      const address = await getAddressFromLatLon(pos.coords.latitude, pos.coords.longitude)
      addressText = `${address.road || ''} ${address.house_number || ''}, ${address.postcode || ''} ${address.county || ''}`
    } catch {
      addressText = ''
    }
    const newAddress = {
      ...addressFrom,
      address: addressText,
      coords: {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      }
    };

    setAddressFrom(newAddress);

    return {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    };
  };

  const cancelTrip = () => {
    setDriverFound(false);
    setAddressFrom({ address: "", coords: { lat: 0, lon: 0 } });
    setAddressTo({ address: "", coords: { lat: 0, lon: 0 } });
    setStepOne(true);
  };

  const openRatingModal = () => {
    setIsRatingOpen(true);
  };

  const closeRatingModal = () => {
    setIsRatingOpen(false);
  };

  useEffect(() => {
    // setInterval(()=>{ getCoords() }, 5 * 1000)
    getCoords();
  }, []);

  return (
    <Layout>
      {isRatingOpen && (
        <Rate close={closeRatingModal} name={name} jobTitle={jobTitle} />
      )}
      {driverFound ? (
        <Trip
          time={4}
          cost={9.27}
          cancelTrip={cancelTrip}
          name={name}
          jobTitle={jobTitle}
          addressFrom={addressFrom.address}
          addressTo={addressTo.address}
          car={car}
          openRatingModal={openRatingModal}
        />
      ) : (
        <main>
          <div className={styles.map}>
            <MapContainer center={[addressFrom.coords.lon, addressFrom.coords.lat]} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
              <MapHooks mapCenter={addressFrom.coords} />
            </MapContainer>
          </div>
          <div className={styles.inputs}>
            {stepOne ? (
              <>
                <input
                  type="text"
                  value={addressFrom.address}
                  onChange={handleInputFrom}
                  onBlur={handleBlurFrom}
                  placeholder="From ..."
                  id='address_from'
                  className={styles.addressInput}
                />
                <p className={styles.hint}>
                  Enter your location. This will help us find you.
                </p>
                <p>
                  We'll give you approximate time of driver arrival after this
                  step
                </p>
                <Button
                  disabled={!addressFrom.address}
                  onClick={() => setStepOne(false)}
                >
                  <ArrowForwardIcon />
                </Button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={addressTo.address}
                  onChange={handleInputTo}
                  onBlur={handleBlurTo}
                  placeholder="To ..."
                  className={styles.addressInput}
                />
                <p className={styles.hint}>
                  Enter your destination. That's the address we'll take you to.
                </p>
                <p>
                  We'll charge you the given price after you accept the offer.
                </p>
                <Button disabled={!addressTo.address} onClick={order}>
                  Order
                  <ArrowForwardIcon />
                </Button>
              </>
            )}
          </div>
          {isSearching && (
            <Loading
              time="5 min"
              address={addressFrom.address}
              stopSearching={stopSearching}
            />
          )}
        </main>
      )}
    </Layout>
  );
}

export default Home;
