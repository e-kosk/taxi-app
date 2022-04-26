import React, { useState } from "react";
import { Button, Rating } from "@mui/material";
import styles from "./Rate.module.scss";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const Rate = ({ name, jobTitle, close }) => {
  const [rate, setRate] = useState(5);
  const [comment, setComment] = useState(
    "Everything was ok, highly recommended."
  );

  const sendRating = () => {
    const data = {
      "name": name,
      "rating": parseInt(rate),
      "comment": comment
    };
    addDoc(collection(db, "ratings"), data);
    close();
  };

  return (
    <div className={styles.rateModal}>
      <Button className={styles.closeIcon} onClick={close}>
        <CloseIcon />
      </Button>
      <h2>Rate your driver.</h2>
      <div className={styles.driver}>
        <img alt="driver" src="https://placebeard.it/100x100" />
        <span>
          <p>
            <strong>{name}</strong>
          </p>
          <p>{jobTitle}</p>
        </span>
      </div>
      <Rating
        value={rate}
        className={styles.rate}
        onChange={(event, newValue) => {
          setRate(newValue || 1);
        }}
      />
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button onClick={sendRating}>
        Send <SendIcon />
      </Button>
    </div>
  );
};

export default Rate;
