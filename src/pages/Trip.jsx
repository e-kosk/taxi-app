import * as React from "react";
import {useState, useEffect} from "react";
import { Routes, Route, Link } from "react-router-dom";
import Layout from "../components/Layout";
import TripSummary from "../components/TripSummary";
import DriverArrived from "../components/DriverArrived";
import WaitingForDriver from "../components/WaitingForDriver";

function Trip() {
    const [driverArrived, setDriverArrived] = useState(false);
    const [tripFinished, setTripFinished] = useState(false);

    function startTrip() {
        setDriverArrived(true)
    }

    return (
      <Layout>
        {tripFinished ? <TripSummary time={'3 min'} cost={5}/> : driverArrived ? <DriverArrived address={'Srednia 2/10'} startTrip={startTrip}/> : <WaitingForDriver time={'30 s'}/>}
      </Layout>
    );
  }

  export default Trip
