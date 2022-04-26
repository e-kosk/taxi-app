import * as React from "react";
import styles from "./Trip.module.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RoundaboutRightIcon from "@mui/icons-material/RoundaboutRight";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { Button } from "@mui/material";
import { convertToTime } from "../helper";
import { useState, useEffect, useContext } from "react";
import { MapContext } from "../context/MapContext";

function TripSummary({
  time,
  cost,
  distance,
  addressFrom,
  addressTo,
  cancelTrip,
  openRatingModal,
}) {
  const {initial, from, setFrom, to, setTo, userLocation, setUserLocation} = useContext(MapContext);
  return (
    <div className={styles.tripSummary}>
      <h3>Your trip is finished.</h3>
      <p className={styles.fromTo}>
        <RoundaboutRightIcon />
        {from.address} <ArrowForwardIcon className={styles.arrowIcon} />{" "}
        {to.address}
      </p>
      <p>
        <AccessTimeIcon /> {convertToTime(time)}
      </p>
      <p>
        <AttachMoneyIcon /> ${cost}
      </p>
      <p>
        <DirectionsCarIcon /> {distance} km
      </p>
      <Button onClick={openRatingModal}>rate this driver</Button>
      <Button onClick={cancelTrip}>need another ride?</Button>
    </div>
  );
}

export default TripSummary;
