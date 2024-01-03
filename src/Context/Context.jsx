import React, { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";

export const UserDataContext = createContext();

export function UserDataProvider({ children }) {
  const [userData, setUserData] = useState("");
  const [otherUserData, setOtherUserData] = useState("");

  const uid = localStorage.getItem("uid");
  useEffect(() => {
    // if (uid) {
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
    // }
  }, []);

  return (
    <UserDataContext.Provider
      value={{ userData, setOtherUserData, otherUserData }}
    >
      {children}
    </UserDataContext.Provider>
  );
}
