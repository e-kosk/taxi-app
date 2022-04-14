import logo from './logo.svg';
import './App.css';
import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home'
import About from './pages/About'
import Trip from './pages/Trip'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="trip" element={<Trip />} />
      </Routes>
    </div>
  );
}

export default App;
