import React from "react";
import HomePage from "./HomePage";
import Menu from "./Menu";
import Sponsered from "./Sponsered";

const Main = () => {
  return (
    <div className="main">
      <Menu />
      <HomePage />
      <Sponsered />
    </div>
  );
};

export default Main;
