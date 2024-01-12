import React, { useContext } from "react";
import Banner from "../../../assets/story.png";
import { AiOutlinePlus } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import Navbar from "../../Navbar/Navbar/Navbar";
import Picture from "./Picture";
import { UserDataContext } from "../../../Context/Context";
import "./Profile.css";
import WritePost from "../HomePage/OtherComponents/WritePost";
import TextPost from "../HomePage/OtherComponents/TextPostCurrentUser";
const Profile = () => {
  const { userData } = useContext(UserDataContext);
  return (
    <div>
      <Navbar />
      <div className="profile-page">
        <div>
          <img className="banner" src={Banner} alt="banner" />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div className="prof-pic-name">
            <Picture />
            <span className="profile-name">
              {userData ? userData.FullName : localStorage.getItem("userName")}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div className="profile-btn">
              <AiOutlinePlus />
              <span className="prof-btn-text">Add to story</span>
            </div>
            <div className="profile-btn profile-btn2">
              <MdEdit />
              <span className="prof-btn-text">Edit Profile</span>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "30%",
            marginLeft: 200,
          }}
        >
          <span className="profile-btn">Posts</span>
          <span className="profile-btn">About</span>
          <span className="profile-btn">Photos</span>
          <span className="profile-btn">Friends</span>
        </div>
      </div>
      <div className="prof-posts">
        <WritePost />
        <TextPost />
      </div>
    </div>
  );
};

export default Profile;
