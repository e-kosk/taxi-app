import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import styles from "./About.module.scss"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { style } from "@mui/system";
import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import AddCardIcon from '@mui/icons-material/AddCard';
import AddCard from "../components/AddCard";

function About() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [ccNumber, setccNumber] = useState("");
  const [ccExpiry, setccExpiry] = useState("");
  const [ccCVV, setccCVV] = useState("");
  const [addingCard, setAddingCard] = useState(false);
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      
      const q = doc(db, "users", user.uid);

      const docs = await getDoc(q);
      const data = docs.data();

      setName(data.name);
      setccNumber(data.ccNumber);
      setccExpiry(data.ccExpiry);
      setccCVV(data.ccCVV);
    } catch (err) {
      console.error(err);

      alert("An error occured while fetching user data");
    }
  };
  const openAddingModal = () => {
    setAddingCard(true)
  }
  const closeAddingModal = () => {
    setAddingCard(false)
  }
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);
    return (
      <Layout>
        <main>
          <div className={styles.dashboard}>
            <div className={styles.container}>
              Logged in as
              <div className={styles.hint}>{name}</div>
              <div className={styles.hint}>{user?.email}</div>
              <div className={styles.cc}>
                <div>{ccNumber}</div>
                <div>{ccExpiry}</div>
                <div>{ccCVV}</div>
              </div>
              <Button onClick={openAddingModal}>
                Add payment&nbsp;&nbsp;<AddCardIcon/>
              </Button>
              <Button onClick={logout}>
                Logout&nbsp;&nbsp;<LogoutIcon />
              </Button>
              {addingCard && 
                <AddCard
                 close={closeAddingModal}
                 ccNumber={ccNumber}
                 setccNumber={setccNumber}
                 ccExpiry={ccExpiry}
                 setccExpiry={setccExpiry}
                 ccCVV={ccCVV}
                 setccCVV={setccCVV}>
                </AddCard>}
            </div>
          </div>
        </main>
      </Layout>
    );
  }

  export default About
