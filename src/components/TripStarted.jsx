import React from "react";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import { Button } from "@mui/material";
import styles from "./Trip.module.scss";
import { convertToTime } from "../helper";

const TripStarted = ({ addressTo, finishTrip, duration }) => {
  return (
    <div className={styles.tripStarted}>
      <h3>Driving to {addressTo} ...</h3>
      <p>{convertToTime(duration)}</p>
      <Button onClick={finishTrip}>
        Finish <SportsScoreIcon />
      </Button>
    </div>
  );
};

export default TripStarted;
