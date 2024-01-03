import React from "react";
import Stories from "./HomePageComp/Stories";
import WritePost from "./HomePageComp/WritePost";
// import Post from "./HomePageComp/Post";
import Posts from "./HomePageComp/Posts";
import TextPost from "./HomePageComp/TextPost";
const HomePage = () => {
  return (
    <div className="homePage">
      <Stories />
      <WritePost />
      {/* <Posts /> */}
      <TextPost />
    </div>
  );
};

export default HomePage;
