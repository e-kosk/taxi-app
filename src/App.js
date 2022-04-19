import "./App.css";
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import History from "./pages/History";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
