import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "../firebase";
import { query, collection, getDoc, doc, where } from "firebase/firestore";
function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [ccNumber, setccNumber] = useState("");
  const [ccExpiry, setccExpiry] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      
      const q = doc(db, "users", user.uid);

      const docs = await getDoc(q);
      const data = docs.data();

      setName(data.name);
      setccNumber(data.ccNumber);
      setccExpiry(data.ccExpiry);
    } catch (err) {
      console.error(err);

      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);
  return (
    <div className="dashboard">
       <div className="dashboard__container">
        Logged in as
         <div>{name}</div>
         <div>{user?.email}</div>
         
         <div>{ccNumber}</div>
         <div>{ccExpiry}</div>
         <button className="dashboard__btn" /*onClick={logout}*/>
          Add payment
         </button>
         <button className="dashboard__btn" onClick={logout}>
          Logout
         </button>
       </div>
     </div>
  );
}
export default Dashboard;
