import React, { useEffect, useState } from "react";
import styles from "./Trip.module.scss";
import { Button } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AcceptTrip from "./AcceptTrip";
import DriverArrived from "./DriverArrived";
import TripStarted from "./TripStarted";
import TripSummary from "./TripSummary";
import WaitingForDriver from "./WaitingForDriver";
import { Map } from "./Map";
import { useContext } from "react";
import { MapContext } from "../context/MapContext";
import { auth,db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Trip = ({
  time,
  cancelTrip,
  name,
  jobTitle,
  addressFrom,
  addressTo,
  car,
  openRatingModal,
}) => {
  const {from, to, cost, distance} = useContext(MapContext);
  const [status, setStatus] = useState("accept");
  const [timeLeft, setTimeLeft] = useState(time);
  const [duration, setDuration] = useState(0);
  const [durationInterval, setDurationInterval] = useState();
  const [user, loading, error] = useAuthState(auth);

  const acceptTrip = () => {
    setStatus("waiting");
  };

  const startTrip = () => {
    setStatus("tripStarted");

    setDurationInterval(
      setInterval(() => {
        setDuration((prevDuration) => {
          return prevDuration + 1;
        });
      }, 1000)
    );
  };

  const finishTrip = () => {
    clearInterval(durationInterval);
    setStatus("tripFinished");

    // save to db
    const data = {
      "from": from,
      "to": to,
      "duration": duration,
      "distance": distance,
      "cost": cost,
      "userId": user.uid,
    };
    // console.log('saving trip', data)
    addDoc(collection(db, "rides"), data);
  };

  const cancel = () => {
    setTimeLeft(time);
    setDuration(0);
    setDurationInterval(undefined);
    setStatus("accept");
    cancelTrip();
  };

  useEffect(() => {
    let interval;

    if (status === "waiting") {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            setStatus("driverArrived");
            clearInterval(interval);
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [status]);

  return (
    <div className={styles.trip}>
      <Button className={styles.cancelButton} onClick={cancel}>
        <HighlightOffIcon />
      </Button>
      <Map />
      <div className={styles.info}>
        {status === "accept" ? (
          <AcceptTrip
            cost={cost}
            distance={distance}
            jobTitle={jobTitle}
            name={name}
            time={time}
            acceptTrip={acceptTrip}
          />
        ) : status === "waiting" ? (
          <WaitingForDriver
            cost={cost}
            jobTitle={jobTitle}
            name={name}
            timeLeft={timeLeft}
          />
        ) : status === "driverArrived" ? (
          <DriverArrived
            name={name}
            address={addressFrom}
            startTrip={startTrip}
            car={car}
          />
        ) : status === "tripStarted" ? (
          <TripStarted
            addressTo={addressTo}
            duration={duration}
            finishTrip={finishTrip}
          />
        ) : status === "tripFinished" ? (
          <TripSummary
            cost={cost}
            distance={distance}
            time={duration}
            addressFrom={addressFrom}
            addressTo={addressTo}
            cancelTrip={cancel}
            openRatingModal={openRatingModal}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Trip;
