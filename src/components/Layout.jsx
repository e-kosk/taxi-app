import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import styles from "./Layout.module.scss";

function Layout({children}) {
    return (
        <div className={styles.layout}>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
  }

  export default Layout
