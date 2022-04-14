import * as React from "react";
import {useState, useEffect} from "react";
import { Routes, Route, Link } from "react-router-dom";
import styles from "./WaitingForDriver.module.scss";

function WaitingForDriver({time}) {
    return (
        <div>
            <h3>Your driver will be at meet point in {time}</h3>
        </div>
    );
  }

export default WaitingForDriver
