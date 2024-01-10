import HomePage from "../HomePage/HomePage";
import Menu from "../Menu/Menu";
import Sponsered from "../Sponsered/Sponsered";
import React, { useContext, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { UserDataContext } from "../../../Context/Context";
import "./Main.css";

const Main = () => {
  const uid = localStorage.getItem("uid");
  const { setUserData } = useContext(UserDataContext);

  useEffect(() => {
    if (uid) {
      const userDocRef = doc(db, "personal-info", uid);

      const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setUserData(data);
          localStorage.setItem("userName", data.FullName);
          localStorage.setItem("photoURL", data.photoURL);
        } else {
          console.log("No such document!");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [uid, setUserData]);
  return (
    <div className="main">
      <Menu />
      <HomePage />
      {/* <Sponsered /> */}
    </div>
  );
};

export default Main;
