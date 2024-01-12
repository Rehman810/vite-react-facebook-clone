import React, { useContext, useEffect } from "react";
import Banner from "../../../assets/story.png";
import { AiOutlinePlus } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import Navbar from "../../Navbar/Navbar/Navbar";
import ProfileImg from "../../../assets/blank-profile.png";
import { UserDataContext } from "../../../Context/Context";
import TextPost from "../HomePage/OtherComponents/TextPostOtherUser";

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
          <div className="prof-pic-name">
            <div>
              {otherUserData.photoURL ? (
                <img
                  // onClick={otherUserData}
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
            <span className="profile-name">{otherUserData.FullName}</span>
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
        <TextPost uid={otherUserData.uid} />
      </div>
    </div>
  );
};

export default OtherUserProfile;
