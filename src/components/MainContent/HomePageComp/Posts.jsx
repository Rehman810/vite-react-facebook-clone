import React from "react";
import Post from "./Post";
const Posts = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Posts;
