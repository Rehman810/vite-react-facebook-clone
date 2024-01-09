import React, { useContext, useState } from "react";
import Profile from "../../../assets/blank-profile.png";
import { FaUserFriends } from "react-icons/fa";
import { RiMemoriesFill } from "react-icons/ri";
import { BsSaveFill, BsCameraFill, BsCalendarEventFill } from "react-icons/bs";
import { MdGroups, MdOndemandVideo } from "react-icons/md";
import { AiFillShop, AiFillHeart } from "react-icons/ai";
import { VscGraph } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../../Context/Context";
import LoadingBar from "react-top-loading-bar";
import "./Menu.css";

const Menu = () => {
  const navigate = useNavigate();
  const { userData } = useContext(UserDataContext);
  const [progress, setProgress] = useState(0);

  const ProfilePage = () => {
    setProgress(100);
    setTimeout(() => {
      navigate(`/profilePage/:${userData.uid}`);
    }, 200);
  };

  return (
    <>
      <LoadingBar
        color="blue"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div
        className="side-fixed"
        style={{ marginTop: 70, overflow: "auto", width: "30%" }}
      >
        <div className="sidebar" onClick={() => ProfilePage()}>
          {userData.photoURL ? (
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
          )}
          <span style={{ fontWeight: "bold" }}>
            {userData ? userData.FullName : localStorage.getItem("userName")}
          </span>
        </div>
        <div className="sidebar">
          <FaUserFriends size={30} />
          <span className="txt">Find Friends</span>
        </div>
        <div className="sidebar">
          <RiMemoriesFill size={30} />
          <span className="txt">Memories</span>
        </div>
        <div className="sidebar">
          <BsSaveFill size={30} />
          <span className="txt">Saved</span>
        </div>
        <div className="sidebar">
          <MdGroups size={30} />
          <span className="txt">Groups</span>
        </div>
        <div className="sidebar">
          <MdOndemandVideo size={30} />
          <span className="txt">Video</span>
        </div>
        <div className="sidebar">
          <AiFillShop size={30} />
          <span className="txt">Marketplace</span>
        </div>
        <div className="sidebar">
          <BsCameraFill size={30} />
          <span className="txt">Feeds</span>
        </div>
        <div className="sidebar">
          <BsCalendarEventFill size={30} />
          <span className="txt">Events</span>
        </div>
        <div className="sidebar">
          <VscGraph size={30} />
          <span className="txt">Ads Manager</span>
        </div>
        <div className="sidebar">
          <AiFillHeart size={30} />
          <span className="txt">Fundraiser</span>
        </div>
      </div>
    </>
  );
};

export default Menu;
