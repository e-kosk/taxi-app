import { Button } from "@mui/material";
import * as React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "./Trip.module.scss";
import CarCrashIcon from "@mui/icons-material/CarCrash";

const DriverArrived = ({ address, startTrip, name, car }) => {
  return (
    <div className={styles.driverArrived}>
      <h3>
        {name} is waiting for you at {address}.
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
