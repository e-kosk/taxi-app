import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./History.module.scss";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { convertToTime } from "../helper";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import { auth,db } from "../firebase";
import { collection, addDoc, query, where, setDoc, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const History = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    //api call for history items
    const q = query(collection(db, "rides"), where("userId", "==", user.uid));
    getDocs(q).then(docs => {
      const ridesData = docs.docs.map((d) => d.data()) 
      setItems(ridesData);
      setIsLoading(false)
    });
  }, []);

  return (
    <Layout>
      <div className={styles.history}>
        <h2>History</h2>
        {isLoading ? (
          <CircularProgress className={styles.loading} />
        ) : items.length ? (
          <div className={styles.items}>
            {items.map((item) => {
              return (
                <div className={styles.item}>
                  <DirectionsCarIcon className={styles.carIcon} />
                  <span>
                    <p className={styles.route}>
                      {item.from.address} <ArrowForwardIcon /> {item.to.address}
                    </p>
                    <div className={styles.stats}>
                      <p>
                        <AccessTimeIcon />
                        {convertToTime(item.duration)}
                      </p>
                      <p>
                        <AttachMoneyIcon />
                        {item.cost}
                      </p>
                    </div>
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.noItems}>
            <DoNotDisturbAltIcon />
            <p>No items.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default History;
