import "./App.css";
import * as React from "react";
import { Router, Routes, Route, Link } from "react-router-dom";
import Trip from './pages/Trip'
import Login from './pages/Login'
import Register from './pages/Register'
import Reset from './pages/Reset'
import Dashboard from './pages/Dashboard'
import Notification from './components/Notification'
import Home from "./pages/Home";
import About from "./pages/About";
import History from "./pages/History";

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
        <Route path="history" element={<History />} />
      </Routes>
      <Notification/>
      
    </div>
  );
}

export default App;
