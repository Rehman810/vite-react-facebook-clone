import React, { useContext, useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import Profile from "../../../../assets/blank-profile.png";
import { AiTwotoneLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { PiShareFatThin } from "react-icons/pi";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase";
import SkeletonPage from "./Skeleton";
import EditPost from "../../../OtherComponents/EditPost";
import { UserDataContext } from "../../../../Context/Context";
import { Flex } from "antd";
import "./TextPost.css";

const TextPost = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setPostId, setPostText, setOnUpdate } = useContext(UserDataContext);

  const Edit = (a) => {
    setPostId(a.id);
    setPostText(a.text);
    setOnUpdate(userPosts);
  };

  useEffect(() => {
    const currentUserId = localStorage.getItem("uid");
    const userPostsCollectionRef = collection(
      db,
      "personal-info",
      currentUserId,
      "posts"
    );
    const queryForPosts = query(
      userPostsCollectionRef,
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(queryForPosts, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserPosts(posts);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {loading ? (
        <SkeletonPage />
      ) : (
        userPosts.map((a, index) => (
          <div className="Post" key={index}>
            <div className="post-head">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {a.photoURL ? (
                  <img className="post-img" src={a.photoURL} alt="profile" />
                ) : (
                  <img className="post-img" src={Profile} alt="profile" />
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ marginTop: "5px", fontSize: 18 }}>
                    {a.name}
                  </span>
                  <p style={{ fontSize: 11, marginTop: "-1px" }}>{a.date}</p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div onClick={() => Edit(a)}>
                  <EditPost />
                </div>
                <RxCross2 className="post-head-icon" size={35} />
              </div>
            </div>
            <p>{a.text}</p>
            {a.postURL ? (
              <div>
                <img
                  src={`${a.postURL}?cache=${Math.random()}`}
                  alt="post"
                  className="post-img2"
                />
              </div>
            ) : null}
            <div className="like-comment">
              <div>
                <AiTwotoneLike size={20} color="blue" />
                <span>1k likes</span>
              </div>
              <div>
                <span>1.5k comments</span> &nbsp;&nbsp;
                <span>500 shares</span>
              </div>
            </div>
            <div className="post-btn">
              <div className="like-btn">
                <AiOutlineLike size={20} />
                <span>Like</span>
              </div>
              <div className="like-btn">
                <FaRegComment size={20} />
                <span>Comment</span>
              </div>
              <div className="like-btn">
                <PiShareFatThin size={20} />
                <span>Share</span>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default TextPost;
