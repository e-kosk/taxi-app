import * as React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Layout.module.scss";
import InfoIcon from "@mui/icons-material/Info";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HistoryIcon from "@mui/icons-material/History";

function Layout({ children }) {
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
        </ul>
      </nav>
    </div>
  );
}

export default Layout;
