import React from "react";
import Navbar from "./Navbar/Navbar";
import Main from "./MainContent/Main";
import { UserDataProvider } from "../Context/Context";

const Home = () => {
  return (
    <>
      {/* <UserDataProvider> */}
      <Navbar />
      <Main />
      {/* </UserDataProvider> */}
    </>
  );
};

export default Home;
