import * as React from "react";
import styles from "./Trip.module.scss";

function WaitingForDriver({ timeLeft, name, jobTitle, cost }) {
  return (
    <>
      <p>
        Driver will be here in{" "}
        <strong>
          {timeLeft} minute{timeLeft > 1 ? "s" : ""}
        </strong>
        . Get ready.
      </p>
      <div className={styles.driverInfo}>
        <img alt="driver" src="https://placebeard.it/150x150" />
        <span>
          <p>
            <strong>{name}</strong>
          </p>
          <p>{jobTitle}</p>
        </span>
      </div>
      <p className={styles.cost}>${cost}</p>
    </>
  );
}

export default WaitingForDriver;
