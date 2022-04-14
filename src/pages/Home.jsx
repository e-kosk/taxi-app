import * as React from "react";
import {useState, useEffect} from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import {getAddressFromLatLon, getLatLonFromAddress} from '../api/nominatim'
import Loading from '../components/Loading'
import {Button} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Home() {
    const [addressFrom, setAddressFrom] = useState({address: '', coords: {lat: 0, lon: 0}});
    const [addressTo, setAddressTo] = useState({address: '', coords: {lat: 0, lon: 0}});
    const [isSearching, setIsSearching] = useState(false);

    let navigate = useNavigate(); 

    const routeChange = () =>{ 
        let path = `trip`; 
        navigate(path);
    }

    function handleInputFrom(e) {
        const newAddress = {...addressFrom, address: e.target.value}
        setAddressFrom(newAddress);
    }

    function handleInputTo(e) {
        const newAddress = {...addressTo, address: e.target.value}
        setAddressTo(newAddress);
    }

    function order() {
        console.log(addressFrom, addressTo)
        setIsSearching(true)
    }

    function stopSearching() {
        setIsSearching(false)
        routeChange()
    }

    function handleBlurFrom(e) {
        const latLon = getLatLonFromAddress(addressFrom)
        const newAddress = {...addressFrom, coords: latLon}
        setAddressFrom(newAddress)
    }

    function handleBlurTo(e) {
        const latLon = getLatLonFromAddress(addressTo)
        const newAddress = {...addressTo, coords: latLon}
        setAddressTo(newAddress)
    }
    
    const getCoords = async () => {
        const pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        })

        const newAddress = {...addressFrom, address: getAddressFromLatLon(addressFrom.address)}

        setAddressFrom(newAddress)

        return {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
        }
    }

    useEffect(()=>{getCoords()}, [])

    return (
      <Layout>
        <main>
          <input type="text" value={addressFrom.address} onChange={handleInputFrom} onBlur={handleBlurFrom} placeholder="From ..."/>
          <input type="text" value={addressTo.address} onChange={handleInputTo} onBlur={handleBlurTo} placeholder="To ..."/>
          <Button onClick={order}>Order<ArrowForwardIcon/></Button>
          {isSearching && <Loading time='5 min' address={addressFrom.address} stopSearching={stopSearching}/>}
        </main>
      </Layout>
    );
  }

  export default Home
