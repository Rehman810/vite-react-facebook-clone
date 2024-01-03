import HomePage from "./HomePage";
import Menu from "./Menu";
import Sponsered from "./Sponsered";
import React, { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { UserDataContext } from "../../Context/Context";

const Main = () => {
  const uid = localStorage.getItem("uid");
  const { setUserData } = useContext(UserDataContext);

  useEffect(() => {
    console.log("Current uid:", uid);
    if (uid) {
      const userDocRef = doc(db, "personal-info", uid);

      const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setUserData(data);
          localStorage.setItem("userName", data.FullName);
        } else {
          console.log("No such document!");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [uid]);
  return (
    <div className="main">
      <Menu />
      <HomePage />
      <Sponsered />
    </div>
  );
};

export default Main;
