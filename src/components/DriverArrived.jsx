import { Button } from "@mui/material";
import * as React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "./Trip.module.scss";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import { useState, useEffect, useContext } from "react";
import { MapContext } from "../context/MapContext";
import UIFx from "uifx";
import noti from '../sounds/noti.mp3';



const DriverArrived = ({ address, startTrip, name, car }) => {
  const {initial, from, setFrom, to, setTo, userLocation, setUserLocation} = useContext(MapContext);
  const alert = new UIFx(
    noti, 
    {
      volume: 0.4, // number between 0.0 ~ 1.0
      throttleMs: 100
    });
  alert.play();
  navigator.vibrate(200,50,200);
  return (
    <div className={styles.driverArrived}>
      <h3>
        {name} is waiting for you at {from.address}.
      </h3>
      <div className={styles.car}>
        <CarCrashIcon />
        <div>
          <p>{car.make}</p>
          <p>{car.id}</p>
        </div>
      </div>
      <Button onClick={startTrip}>
        Start <ArrowForwardIcon />
      </Button>
    </div>
  );
};

export default DriverArrived;
