import React, { useState } from "react";
import { Button } from "@mui/material";
import styles from "./AddCard.module.scss";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const AddCard = ({ 
  close, 
  ccNumber,
  setccNumber, 
  ccExpiry,
  setccExpiry, 
  ccCVV,
  setccCVV,
}) => {
  const [user, loading, error] = useAuthState(auth);

  const addCreditCard = async () => {
    const cardData = {
      "ccNumber": ccNumber,
      "ccExpiry": ccExpiry,
      "ccCVV": ccCVV
    };
    console.log('data', cardData)
    await setDoc(doc(db, "users", user.uid), cardData, {merge: true});
    close();
  };

  return (
    <div className={styles.addCardModal}>
      <Button className={styles.closeIcon} onClick={close}>
        <CloseIcon />
      </Button>
      <h2>Add credit card</h2>
      <div className={styles.inputs}>
      <input
        type="text"
        placeholder="Card number ..."
        value={ccNumber}
        onChange={(e) => {setccNumber(e.target.value)}}
        className={styles.input}
      />
      <input
        type="date"
        placeholder="Expiration ..."
        value={ccExpiry}
        onChange={(e) => {setccExpiry(e.target.value)}}
        className={styles.input}
      />
      <input
        type="number"
        placeholder="CVV ..."
        value={ccCVV}
        onChange={(e) => {setccCVV(e.target.value)}}
        className={styles.input}
        max="999"
      />
      </div>
      <Button onClick={addCreditCard}>
        Add <SendIcon />
      </Button>
    </div>
  );
};

export default AddCard;
