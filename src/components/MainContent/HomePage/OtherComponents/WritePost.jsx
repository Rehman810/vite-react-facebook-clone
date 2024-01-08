import React, { useContext, useState } from "react";
import Profile from "../../../../assets/blank-profile.png";
import { MdVideoCameraBack } from "react-icons/md";
import { BiHappyAlt } from "react-icons/bi";
import { UserDataContext } from "../../../../Context/Context";
import { Button, Modal } from "antd";
import { db, auth } from "../../../../firebase";
import {
  serverTimestamp,
  collection,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import AddPhotoswithText from "./AddPhotoswithText";
import "./WritePost.css";

const WritePost = () => {
  const { userData } = useContext(UserDataContext);
  const [postText, setPostText] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    Post();
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const currentDate = new Date();
  const oneMonthLater = new Date(currentDate);
  oneMonthLater.setMonth(currentDate.getMonth() + 1);

  var now = new Date();

  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Octuber",
    "November",
    "December",
  ];
  const month = monthName[now.getMonth()];
  const day = new Date().getDate();
  const year = now.getFullYear();

  const date = `${month} ${day}, ${year}`;
  const Post = async () => {
    if (postText.trim() !== "") {
      try {
        const currentUserId = auth.currentUser.uid;

        const userPostsCollectionRef = collection(
          db,
          "personal-info",
          currentUserId,
          "posts"
        );

        const newPostRef = await addDoc(userPostsCollectionRef, {
          text: postText,
          date: date,
          name: userData.FullName,
          photoURL: userData.photoURL,
          timestamp: serverTimestamp(),
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      setPostText("");
    }
  };
  return (
    <div className="write-post">
      <div className="Write">
        {userData ? (
          userData.photoURL ? (
            <img
              src={userData.photoURL}
              alt="profile"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50px",
                marginLeft: 10,
                marginRight: 20,
              }}
            />
          ) : (
            <img
              src={Profile}
              alt="profile"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50px",
                marginLeft: 10,
                marginRight: 20,
              }}
            />
          )
        ) : (
          <img
            src={localStorage.getItem("photoURL")}
            alt="profile"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50px",
              marginLeft: 10,
              marginRight: 20,
            }}
          />
        )}
        <div
          className="search write-search"
          style={{ width: "85%" }}
          onClick={showModal}
        >
          <input
            className="search-input"
            type="text"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder={`What's on your mind, ${
              userData ? userData.FullName : localStorage.getItem("userName")
            }?`}
          />
        </div>

        <Modal
          open={open}
          title="Create post"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={handleOk}
            >
              Post
            </Button>,
          ]}
        >
          <div style={{ height: "15vw" }}>
            <div className="sidebar">
              {userData ? (
                userData.photoURL ? (
                  <img
                    src={userData.photoURL}
                    alt="profile"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50px",
                      marginRight: 20,
                    }}
                  />
                ) : (
                  <img
                    src={Profile}
                    alt="profile"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50px",
                      marginRight: 20,
                    }}
                  />
                )
              ) : (
                <img
                  src={localStorage.getItem("photoURL")}
                  alt="profile"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50px",
                    marginRight: 20,
                  }}
                />
              )}
              <span style={{ fontWeight: "bold" }}>
                {userData
                  ? userData.FullName
                  : localStorage.getItem("userName")}
              </span>
            </div>
            <input
              type="text"
              className="post-inp"
              placeholder={`What's on your mind, ${
                userData ? userData.FullName : localStorage.getItem("userName")
              }?`}
              onChange={(e) => setPostText(e.target.value)}
            />
          </div>
        </Modal>
      </div>
      <div className="write-vid-activity">
        <div className="write-btn">
          <MdVideoCameraBack color="red" size={20} />
          <span>Live video</span>
        </div>
        <AddPhotoswithText />
        <div className="write-btn">
          <BiHappyAlt color="yellow" size={20} />
          <span>Feeling/activity</span>
        </div>
      </div>
    </div>
  );
};

export default WritePost;
