import React from "react";
import Stories from "./OtherComponents/Stories";
import WritePost from "./OtherComponents/WritePost";
import TextPost from "./OtherComponents/TextPost";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homePage">
      <Stories />
      <WritePost />
      <TextPost />
    </div>
  );
};

export default HomePage;
