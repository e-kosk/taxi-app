import { Button } from "@mui/material";
import * as React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "./Trip.module.scss";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import { useState, useEffect, useContext } from "react";
import { MapContext } from "../context/MapContext";

const DriverArrived = ({ address, startTrip, name, car }) => {
  const {initial, from, setFrom, to, setTo, userLocation, setUserLocation} = useContext(MapContext);
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
