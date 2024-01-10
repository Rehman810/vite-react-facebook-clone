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
import "./TextPost.css";

const TextPost = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllUsersPosts = () => {
      try {
        const usersCollectionRef = collection(db, "personal-info");
        const unsubscribeUsers = onSnapshot(
          usersCollectionRef,
          (querySnapshot) => {
            const allUsersPostsData = [];

            querySnapshot.forEach((userDoc) => {
              const userId = userDoc.id;
              const userPostsCollectionRef = collection(
                db,
                "personal-info",
                userId,
                "posts"
              );
              const userQueryForPosts = query(
                userPostsCollectionRef,
                orderBy("timestamp", "desc")
              );

              const unsubscribePosts = onSnapshot(
                userQueryForPosts,
                (userQuerySnapshot) => {
                  userQuerySnapshot.forEach((postDoc) => {
                    allUsersPostsData.push({
                      postId: postDoc.id,
                      ...postDoc.data(),
                    });
                  });
                  allUsersPostsData.sort((a, b) => b.timestamp - a.timestamp);
                  setUserPosts(() => [...allUsersPostsData]);
                  setLoading(false);
                }
              );
            });
          }
        );
        return () => {
          unsubscribeUsers();
        };
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAllUsersPosts();
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
              <div>
                <RxCross2 className="post-head-icon" size={35} />
              </div>
            </div>
            <p>{a.text}</p>
            {a.postURL ? (
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
                <span className="post-txt">1k likes</span>
              </div>
              <div>
                <span className="post-txt">1.5k comments</span> &nbsp;&nbsp;
                <span className="post-txt">500 shares</span>
              </div>
            </div>
            <div className="post-btn">
              <div className="like-btn">
                <AiOutlineLike size={20} />
                <span className="post-txt">Like</span>
              </div>
              <div className="like-btn">
                <FaRegComment size={20} />
                <span className="post-txt">Comment</span>
              </div>
              <div className="like-btn">
                <PiShareFatThin size={20} />
                <span className="post-txt">Share</span>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default TextPost;
