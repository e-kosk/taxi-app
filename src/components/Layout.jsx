import * as React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styles from "./Layout.module.scss";
import InfoIcon from "@mui/icons-material/Info";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HistoryIcon from "@mui/icons-material/History";
import { logout } from "../firebase";

function Layout({ children }) {
  let navigate = useNavigate(); 
  const logout_redirect = () =>{ 
    let path = `/`; 
    logout().then(() =>{ 
    navigate(path)
    });    
  }

  return (
    <div className={styles.layout}>
      <div className={styles.content}>{children}</div>
      <nav>
        <ul>
          <li>
            <NavLink to="/about">
              <InfoIcon />
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <DirectionsCarIcon />
            </NavLink>
          </li>
          <li>
            <NavLink to="/history">
              <HistoryIcon />
            </NavLink>
          </li>
          <button className="dashboard__btn" onClick={logout_redirect}>Logout</button>
        </ul>
      </nav>
    </div>
  );
}

export default Layout;
