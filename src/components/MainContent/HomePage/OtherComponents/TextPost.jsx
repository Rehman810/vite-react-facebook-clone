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
                      userId,
                      postId: postDoc.id,
                      ...postDoc.data(),
                    });
                  });

                  // Sort all posts based on timestamp in descending order
                  allUsersPostsData.sort((a, b) => b.timestamp - a.timestamp);

                  // Update state with the sorted posts from all users
                  setUserPosts(allUsersPostsData);
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
                  <span style={{ marginTop: "5px", fontSize: 18 }}>
                    {a.name}
                  </span>
                  <p style={{ fontSize: 11, marginTop: "-1px" }}>{a.date}</p>
                </div>
              </div>
              <div>
                <RxCross2 className="post-head-icon" size={20} />
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
