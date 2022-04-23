import React from "react";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import { Button } from "@mui/material";
import styles from "./Trip.module.scss";
import { convertToTime } from "../helper";
import { useState, useEffect, useContext } from "react";
import { MapContext } from "../context/MapContext";

const TripStarted = ({ addressTo, finishTrip, duration }) => {
  const {initial, from, setFrom, to, setTo, userLocation, setUserLocation} = useContext(MapContext);
  return (
    <div className={styles.tripStarted}>
      <h3>Driving to {to.address} ...</h3>
      <p>{convertToTime(duration)}</p>
      <Button onClick={finishTrip}>
        Finish <SportsScoreIcon />
      </Button>
    </div>
  );
};

export default TripStarted;
