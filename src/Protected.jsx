import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Protected = (props) => {
  const { Component } = props;
  let navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (!uid) {
      navigate("/login");
    }
    // else {
    // const restrictedRoutes = ["/profilePage", "/otherProfile", "/"];

    // if (restrictedRoutes.includes(location.pathname)) {
    //   navigate("/page1/");
    //   return;
    // }

    // const auth = getAuth();
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     console.log("User is logged in");
    //   } else {
    //     signOut(auth).then(() => {
    //       localStorage.removeItem("uid");
    //     });
    //   }
    // });
    // }
  });
  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
