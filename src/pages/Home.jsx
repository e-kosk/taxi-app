import * as React from "react";
import { useState, useEffect, useContext } from "react";
import Layout from "../components/Layout";
import { getAddressFromLatLon, getLatLonFromAddress } from "../api/nominatim";
import Loading from "../components/Loading";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "./Home.module.scss";
import Trip from "../components/Trip";
import Rate from "../components/Rate";
import { Map } from "../components/Map"
import { MapContext } from "../context/MapContext";

const name = "James";
const jobTitle = "Taxi Driver";

const car = {
  make: "Toyota Colorlla",
  id: "KR 4FY7A",
  color: "white",
};

function Home() {
  const {initial, from, setFrom, to, setTo, userLocation, setUserLocation} = useContext(MapContext);
  const [isSearching, setIsSearching] = useState(false);
  const [stepOne, setStepOne] = useState(true);
  const [driverFound, setDriverFound] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  function handleInputFrom(e) {
    const newAddress = { ...from, address: e.target.value };
    setFrom(newAddress);
  }

  function handleInputTo(e) {
    const newAddress = { ...to, address: e.target.value };
    setTo(newAddress);
  }

  function order() {
    setIsSearching(true);
  }

  function stopSearching() {
    setIsSearching(false);
    setDriverFound(true);
  }

  async function handleBlurFrom(e) {
    const latLon = await getLatLonFromAddress(from.address);
    const newAddress = { ...from, coords: latLon };
    setFrom(newAddress);
  }

  async function handleBlurTo(e) {
    const latLon = await getLatLonFromAddress(to.address);
    const newAddress = { ...to, coords: latLon };
    setTo(newAddress);
  }

  const getCoords = async () => {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    let addressText
    try {
      addressText = await getAddressFromLatLon(pos.coords.latitude, pos.coords.longitude)
    } catch {
      addressText = ''
    }
    const coords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    }
    const newAddress = {
      ...from,
      address: addressText,
      coords: coords
    };

    setFrom(newAddress);
    setUserLocation(coords);

    return coords;
  };

  const cancelTrip = () => {
    setDriverFound(false);
    setFrom({ address: "", coords: { lat: 0, lon: 0 } });
    setTo({ address: "", coords: { lat: 0, lon: 0 } });
    setStepOne(true);
  };

  const openRatingModal = () => {
    setIsRatingOpen(true);
  };

  const closeRatingModal = () => {
    setIsRatingOpen(false);
  };

  useEffect(() => {
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
          from={from.address}
          to={to.address}
          car={car}
          openRatingModal={openRatingModal}
        />
      ) : (
        <main>
          <Map />
          <div className={styles.inputs}>
            {stepOne ? (
              <>
                <input
                  type="text"
                  value={from.address}
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
                  disabled={!from.address}
                  onClick={() => setStepOne(false)}
                >
                  <ArrowForwardIcon />
                </Button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={to.address}
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
                <Button disabled={!to.address} onClick={order}>
                  Order
                  <ArrowForwardIcon />
                </Button>
              </>
            )}
          </div>
          {isSearching && (
            <Loading
              time="5 min"
              address={from.address}
              stopSearching={stopSearching}
            />
          )}
        </main>
      )}
    </Layout>
  );
}

export default Home;
