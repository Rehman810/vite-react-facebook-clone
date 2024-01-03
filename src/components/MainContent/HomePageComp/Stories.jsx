import React, { useContext } from "react";
import Blank from "../../../assets/blank-profile.png";
import Profile from "../../../assets/profile.jpg";
import Story from "../../../assets/story.png";
import { BsPlusCircleFill } from "react-icons/bs";
import { UserDataContext } from "../../../Context/Context";

const Stories = () => {
  const { userData } = useContext(UserDataContext);

  return (
    <div className="story-section">
      <div className="create-story">
        {userData.photoURL ? (
          <img
            src={userData.photoURL}
            alt="profile"
            style={{
              width: "10vw",
              height: "10vw",
              borderRadius: "10px 10px 0px 0px",
            }}
          />
        ) : (
          <img
            src={Blank}
            alt="profile"
            style={{ width: "10vw", borderRadius: "10px 10px 0px 0px" }}
          />
        )}
        <BsPlusCircleFill
          color="blue"
          size={30}
          style={{
            position: "relative",
            top: -12,
            backgroundColor: "white",
            padding: 1,
            border: ".5px solid white",
            borderRadius: 10,
          }}
        />
        <span style={{ fontSize: "12px", marginBottom: 3 }}>Create Story</span>
      </div>
      <div className="stories">
        <img
          src={Profile}
          alt="profile"
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "20px",
            border: "2px solid blue",
            position: "relative",
            top: 15,
            left: 10,
          }}
        />
        <img
          src={Story}
          alt="story"
          style={{
            marginLeft: 12,
            width: "8vw",
            borderRadius: "10px",
            height: "9vw",
            alignItems: "center",
          }}
        />
        <span
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            color: "white",
            position: "relative",
            top: -15,
            left: 15,
          }}
        >
          Waseem
        </span>
      </div>
    </div>
  );
};

export default Stories;
