import * as React from "react";
import {useState, useEffect} from "react";
import { Routes, Route, Link } from "react-router-dom";
import styles from "./TripSummary.module.scss";

function TripSummary({time, cost}) {
    return (
        <div>
            <h3>Your trip is finished</h3>
            <h4>Time: <strong>{time}</strong></h4>
            <h4>Total cost: <strong>{cost}</strong></h4>
        </div>
    );
  }

export default TripSummary
