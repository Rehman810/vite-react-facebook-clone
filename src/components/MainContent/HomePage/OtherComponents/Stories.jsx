import React, { useContext } from "react";
import Blank from "../../../../assets/blank-profile.png";
import Profile from "../../../../assets/profile.jpg";
import Story from "../../../../assets/story.png";
import { FaCirclePlus } from "react-icons/fa6";
import { UserDataContext } from "../../../../Context/Context";
import "./Stories.css";

const Stories = () => {
  const { userData } = useContext(UserDataContext);

  return (
    <div className="story-section">
      <div className="create-story">
        {userData.photoURL ? (
          <img
            src={userData.photoURL}
            alt="profile"
            className="story-profile"
          />
        ) : (
          <img src={Blank} alt="profile" className="story-profile" />
        )}
        <FaCirclePlus className="add-story-icon" />
        <span style={{ fontSize: "12px", marginBottom: 3 }}>Create Story</span>
      </div>
      <div className="stories">
        <img src={Profile} alt="profile" className="stories-profile" />
        <img src={Story} className="stories-img" alt="story" />
        <span className="stories-span">Anonymous</span>
      </div>
    </div>
  );
};

export default Stories;
