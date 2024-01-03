import React, { useContext, useState, useEffect } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import Profile from "../../../assets/blank-profile.png";
import Posts from "../../../assets/story.png";
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
import { auth, db } from "../../../firebase";

const TextPost = () => {
  const { userData } = useContext(UserDataContext);
  const [userPosts, setUserPosts] = useState([]);

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
                  const userPosts = [];
                  userQuerySnapshot.forEach((postDoc) => {
                    userPosts.push({
                      userId,
                      postId: postDoc.id,
                      ...postDoc.data(),
                    });
                  });

                  // Update state with the posts of the current user
                  setUserPosts((prevData) => {
                    // Filter out previous data for the current user
                    const newData = prevData.filter(
                      (post) => post.userId !== userId
                    );
                    // Concatenate the new posts for the current user
                    return newData.concat(userPosts);
                  });
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
          <p>{a.text}</p>
          {/* {console.log(a.postURL)} */}
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
      ))}
    </>
  );
};

export default TextPost;
