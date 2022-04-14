import * as React from "react";
import {useState, useEffect} from "react";
import { Routes, Route, Link } from "react-router-dom";
import styles from "./DriverArrived.module.scss";

function DriverArrived({address, startTrip}) {
    return (
        <div>
            <h3>Your driver is waiting for you at {address}</h3>
            <button onClick={startTrip}>Start</button>
        </div>
    );
  }

export default DriverArrived
