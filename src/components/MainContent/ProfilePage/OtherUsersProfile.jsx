import React, { useContext } from "react";
import Banner from "../../../assets/story.png";
import { AiOutlinePlus } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import Navbar from "../../Navbar/Navbar/Navbar";
import ProfileImg from "../../../assets/blank-profile.png";
import WritePost from "../HomePage/OtherComponents/WritePost";
import Posts from "../HomePage/OtherComponents/Posts";
import { UserDataContext } from "../../../Context/Context";

const OtherUserProfile = () => {
  const { otherUserData } = useContext(UserDataContext);

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
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              flexDirection: "row",
            }}
          >
            <div>
              {otherUserData.photoURL ? (
                <img
                  onClick={otherUserData}
                  src={otherUserData.photoURL}
                  alt="profile-img"
                  className="profilePageImg"
                />
              ) : (
                <img
                  src={ProfileImg}
                  alt="profile-img"
                  className="profilePageImg"
                />
              )}
            </div>
            <span
              style={{
                position: "relative",
                left: 280,
                top: -110,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {otherUserData.FullName}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: 150,
                backgroundColor: "#0861F2",
                cursor: "pointer",
                padding: 7,
                color: "white",
                borderRadius: 10,
              }}
            >
              <AiOutlinePlus />
              <span>Add to story</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: 150,
                marginRight: 230,
                backgroundColor: "#D8DADF",
                cursor: "pointer",
                padding: 7,
                borderRadius: 10,
              }}
            >
              <MdEdit />
              <span>Edit Profile</span>
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
      <div style={{ width: "50%", marginLeft: "20vw" }}>
        <Posts />
      </div>
    </div>
  );
};

export default OtherUserProfile;
