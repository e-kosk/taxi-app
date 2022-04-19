import logo from './logo.svg';
import './App.css';
import * as React from "react";
import { Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home'
import About from './pages/About'
import Trip from './pages/Trip'
import Login from './pages/Login'
import Register from './pages/Register'
import Reset from './pages/Reset'
import Dashboard from './pages/Dashboard'
import Notification from './components/Notification'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="trip" element={<Trip />} />
      </Routes>
      <Notification/>
      
    </div>
  );
}

export default App;
