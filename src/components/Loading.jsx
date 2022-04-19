import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./Loading.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import DoneIcon from "@mui/icons-material/Done";

function Loading({ address, time, stopSearching }) {
  const [isSearching, setIsSearching] = useState(true);

  function startSearching() {
    setTimeout(() => {
      setIsSearching(false);
      setTimeout(() => {
        stopSearching();
      }, 1 * 1000);
    }, 2 * 1000); // fake, looking for a driver
  }

  useEffect(() => {
    startSearching();
  }, []);
  return (
    <div className={styles.loader}>
      {isSearching ? (
        <h2>Searching for a driver ...</h2>
      ) : (
        <h2>We found a driver for you.</h2>
      )}
      {isSearching ? <CircularProgress /> : <DoneIcon />}
    </div>
  );
}

export default Loading;
