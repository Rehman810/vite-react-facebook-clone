import React from "react";
import Login from "../components/LoginOrSignUp/Login";
import SignUp from "../components/LoginOrSignUp/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const NonUserPages = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default NonUserPages;
