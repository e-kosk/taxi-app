import * as React from "react";
import styles from "./Trip.module.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RoundaboutRightIcon from "@mui/icons-material/RoundaboutRight";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Button } from "@mui/material";
import { convertToTime } from "../helper";

function TripSummary({
  time,
  cost,
  addressFrom,
  addressTo,
  cancelTrip,
  openRatingModal,
}) {
  return (
    <div className={styles.tripSummary}>
      <h3>Your trip is finished.</h3>
      <p className={styles.fromTo}>
        <RoundaboutRightIcon />
        {addressFrom} <ArrowForwardIcon className={styles.arrowIcon} />{" "}
        {addressTo}
      </p>
      <p>
        <AccessTimeIcon /> {convertToTime(time)}
      </p>
      <p>
        <AttachMoneyIcon /> ${cost}
      </p>
      <Button onClick={openRatingModal}>rate this driver</Button>
      <Button onClick={cancelTrip}>need another ride?</Button>
    </div>
  );
}

export default TripSummary;
