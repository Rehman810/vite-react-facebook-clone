import React, { useContext, useState } from "react";
import Search from "./Search";
import Logo from "../../assets/logo.png";
import { GoHomeFill } from "react-icons/go";
import { FaUserFriends, FaGamepad } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";
import { BiLogoMessenger } from "react-icons/bi";
import { BsFillBellFill } from "react-icons/bs";
import UserNavigation from "../ExtraComp/UserNavigation";
import { useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

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
    <div
      style={{
        color: "white",
        lineHeight: "16.08px",
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        margin: 0,
        padding: 0,
        backgroundColor: "white",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        height: "50px",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 20,
      }}
    >
      <LoadingBar
        color="blue"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: 20,
          cursor: "pointer",
        }}
      >
        <img
          onClick={() => Home()}
          src={Logo}
          style={{ width: "40px", height: "40px", marginRight: 10 }}
          alt="logo"
        />
        <Search />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "50%",
          marginTop: 8,
          cursor: "pointer",
        }}
      >
        <GoHomeFill className="tabs" title="Home" size={30} color="black" />
        <FaUserFriends
          className="tabs"
          title="Friends"
          size={30}
          color="black"
        />
        <MdOndemandVideo
          className="tabs"
          title="Video"
          size={30}
          color="black"
        />
        <IoIosPeople className="tabs" title="Group" size={30} color="black" />
        <FaGamepad className="tabs" title="Gaming" size={30} color="black" />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginRight: 8,
          width: "18%",
          marginTop: 8,
        }}
      >
        <TbGridDots
          size={25}
          color="black"
          style={{ backgroundColor: "#D8DADF", borderRadius: 50, padding: 8 }}
        />
        <BiLogoMessenger
          size={25}
          color="black"
          style={{ backgroundColor: "#D8DADF", borderRadius: 50, padding: 8 }}
        />
        <BsFillBellFill
          size={25}
          color="black"
          style={{ backgroundColor: "#D8DADF", borderRadius: 50, padding: 8 }}
        />
        <UserNavigation />
      </div>
    </div>
  );
};

export default Navbar;
