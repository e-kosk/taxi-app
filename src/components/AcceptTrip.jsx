import { Button } from "@mui/material";
import React from "react";
import styles from "./Trip.module.scss";
import DoneIcon from "@mui/icons-material/Done";

const AcceptTrip = ({ time, jobTitle, cost, name, acceptTrip }) => {
  return (
    <div className={styles.acceptTrip}>
      <div className={styles.driver}>
        <img alt="Driver" src="https://placebeard.it/120x120" />
        <span>
          <p>
            <strong>{name}</strong>
          </p>
          <p>{jobTitle}</p>
        </span>
      </div>
      <div className={styles.tripInfo}>
        <p>{time} min</p>
        <p>${cost}</p>
      </div>
      <Button onClick={acceptTrip}>
        accept <DoneIcon />
      </Button>
    </div>
  );
};

export default AcceptTrip;
