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

const mockItems = [
  {
    from: "Długa 21",
    to: "Krótka 12",
    duration: 105,
    cost: 9.21,
    driver: {
      name: "James",
      jobTitle: "Taxi Driver",
      img: "https://placebeard.it/100x100",
    },
  },
  {
    from: "Rynek 1",
    to: "Mogilska 132",
    duration: 302,
    cost: 15.21,
    driver: {
      name: "Michael",
      jobTitle: "Premium Taxi Driver",
      img: "https://placebeard.it/100x100",
    },
  },
  {
    from: "Kalwaryjska 109",
    to: "Lubicz 38",
    duration: 253,
    cost: 13.89,
    driver: {
      name: "Dave",
      jobTitle: "Taxi Driver",
      img: "https://placebeard.it/100x100",
    },
  },
];

const History = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //api call for history items
    setTimeout(() => {
      setItems([...mockItems, ...mockItems, ...mockItems, ...mockItems, ...mockItems, ...mockItems]);
      setIsLoading(false);
    }, 1000);
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
                      {item.from} <ArrowForwardIcon /> {item.to}
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
