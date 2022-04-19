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
    console.log(addressFrom, addressTo);
    setIsSearching(true);
  }

  function stopSearching() {
    setIsSearching(false);
    setDriverFound(true);
  }

  function handleBlurFrom(e) {
    const latLon = getLatLonFromAddress(addressFrom);
    const newAddress = { ...addressFrom, coords: latLon };
    setAddressFrom(newAddress);
  }

  function handleBlurTo(e) {
    const latLon = getLatLonFromAddress(addressTo);
    const newAddress = { ...addressTo, coords: latLon };
    setAddressTo(newAddress);
  }

  const getCoords = async () => {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const newAddress = {
      ...addressFrom,
      address: getAddressFromLatLon(pos.coords.latitude, pos.coords.longitude),
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
          <div className={styles.map}></div>
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
