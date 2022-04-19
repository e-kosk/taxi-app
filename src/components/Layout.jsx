import * as React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import styles from "./Layout.module.scss";
import { logout } from "../firebase";


function Layout({children}) {
    let navigate = useNavigate(); 
    const logout_redirect = () =>{ 
    let path = `/`; 
    logout();
    navigate(path);
  }

    return (
        <div className={styles.layout}>
            <nav>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <button className="dashboard__btn" onClick={logout_redirect}>Logout</button>
                </ul>
            </nav>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
  }

  export default Layout
