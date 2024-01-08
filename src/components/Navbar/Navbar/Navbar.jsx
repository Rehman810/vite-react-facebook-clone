import React, { useState } from "react";
import Search from "../Search/Search";
import Logo from "../../../assets/logo.png";
import { GoHomeFill } from "react-icons/go";
import { FaUserFriends, FaGamepad } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";
import { BiLogoMessenger } from "react-icons/bi";
import { BsFillBellFill } from "react-icons/bs";
import UserNavigation from "../../OtherComponents/UserNavigation";
import { useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const Home = () => {
    setProgress(100);
    setTimeout(() => {
      navigate("/");
    }, 200);
  };
  return (
    <div className="header-container">
      <LoadingBar
        className="loading-bar"
        color="blue"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="logo-section" onClick={() => Home()}>
        <img src={Logo} className="logo" alt="logo" />
        <Search />
      </div>
      <div className="tabs-section">
        <GoHomeFill className="tabs" title="Home" size={40} color="black" />
        <FaUserFriends
          className="tabs"
          title="Friends"
          size={40}
          color="black"
        />
        <MdOndemandVideo
          className="tabs"
          title="Video"
          size={40}
          color="black"
        />
        <IoIosPeople className="tabs" title="Group" size={40} color="black" />
        <FaGamepad className="tabs" title="Gaming" size={40} color="black" />
      </div>
      <div className="user-icons-section">
        <TbGridDots className="react-icons" size={40} color="black" />
        <BiLogoMessenger className="react-icons" size={40} color="black" />
        <BsFillBellFill className="react-icons" size={40} color="black" />
        <UserNavigation />
      </div>
      <div className="navigation">
        <UserNavigation />
      </div>
    </div>
  );
};

export default Navbar;
