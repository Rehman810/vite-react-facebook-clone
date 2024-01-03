import React, { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";

export const UserDataContext = createContext();

export function UserDataProvider({ children }) {
  const [userData, setUserData] = useState("");
  const [otherUserData, setOtherUserData] = useState("");

  // const uid = localStorage.getItem("uid");
  // useEffect(() => {
  //   console.log("Current uid:", uid);
  //   if (uid) {
  //     const userDocRef = doc(db, "personal-info", uid);

  //     const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
  //       if (docSnapshot.exists()) {
  //         const data = docSnapshot.data();
  //         setUserData(data);
  //         localStorage.setItem("userName", data.FullName);
  //         console.log("Document exists!");
  //         console.log(typeof uid);
  //       } else {
  //         console.log("No such document!");
  //       }
  //     });

  //     return () => {
  //       unsubscribe();
  //     };
  //   }
  // }, [uid]); // No dependencies, so it runs once when the component mounts

  return (
    <UserDataContext.Provider
      value={{ userData, setUserData, setOtherUserData, otherUserData }}
    >
      {children}
    </UserDataContext.Provider>
  );
}
