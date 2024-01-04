import React, { useContext, useState, useEffect } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import Profile from "../../../assets/blank-profile.png";
import { AiTwotoneLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { PiShareFatThin } from "react-icons/pi";
import { UserDataContext } from "../../../Context/Context";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { Skeleton, Spin } from "antd";

const TextPost = () => {
  const { userData } = useContext(UserDataContext);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      {userPosts.map((a, index) => (
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
                <img
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50px",
                    marginLeft: 10,
                    marginRight: 20,
                  }}
                  src={a.photoURL}
                  alt="profile"
                />
              ) : (
                <img
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50px",
                    marginLeft: 10,
                    marginRight: 20,
                  }}
                  src={Profile}
                  alt="profile"
                />
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <span style={{ marginTop: "5px", fontSize: 18 }}>{a.name}</span>
                <p style={{ fontSize: 11, marginTop: "-1px" }}>{a.date}</p>
              </div>
            </div>
            <div>
              <BiDotsHorizontalRounded className="post-head-icon" size={20} />
              <RxCross2 className="post-head-icon" size={20} />
            </div>
          </div>
          {loading ? <Skeleton active /> : <p>{a.text}</p>}
          {/* {console.log(a.postURL)} */}
          {loading ? (
            <Skeleton.Image active />
          ) : a.postURL ? (
            <div>
              <img
                src={`${a.postURL}?cache=${Math.random()}`}
                alt="post"
                className="post-img"
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
      ))}
    </>
  );
};

export default TextPost;
