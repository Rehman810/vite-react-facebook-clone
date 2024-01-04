import React, { useContext, useState } from "react";
import { IoIosSettings, IoIosHelpCircle } from "react-icons/io";
import { MdFeedback } from "react-icons/md";
import { BsFillMoonFill } from "react-icons/bs";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { Dropdown } from "antd";
import Profile from "../../assets/blank-profile.png";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../Context/Context";
import LoadingBar from "react-top-loading-bar";

const Navigation = () => {
  const { userData } = useContext(UserDataContext);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();
  const signout = async () => {
    try {
      setProgress(50);
      await signOut(auth);
      localStorage.removeItem("uid");
      localStorage.removeItem("userName");
      setProgress(100);
      setTimeout(() => {
        navigate("/login");
      }, 200);
    } catch (error) {
      setProgress(50);
      console.error("Error signing out:", error.message);
    }
  };

  const items = [
    {
      label: (
        <div className="navIcon">
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
          <span
            style={{ fontSize: "16px", fontWeight: "bold", marginTop: "5px" }}
          >
            {userData.FullName}
          </span>
        </div>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <div className="navIcon">
          <IoIosSettings size={20} />
          <span className="navText">Settings & Privacy</span>
        </div>
      ),
      key: "1",
    },

    {
      label: (
        <div className="navIcon">
          <IoIosHelpCircle size={20} />
          <span className="navText">Help and Support</span>
        </div>
      ),
      key: "3",
    },
    {
      label: (
        <div className="navIcon">
          <BsFillMoonFill size={20} />
          <span className="navText">Display and accessibility</span>
        </div>
      ),
      key: "4",
    },
    {
      label: (
        <div className="navIcon">
          <MdFeedback size={20} />
          <span className="navText">Give feedback</span>
        </div>
      ),

      key: "5",
    },
    {
      label: (
        <div
          className="navIcon"
          onClick={() => {
            signout();
          }}
        >
          <RiLogoutBoxRFill size={20} />
          <span className="navText">Log out</span>
        </div>
      ),
      key: "6",
    },
  ];
  return (
    <>
      <LoadingBar
        color="blue"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
      >
        {userData.photoURL ? (
          <img
            src={userData.photoURL}
            alt="profile"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50px",
              marginRight: 20,
              cursor: "pointer",
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
      </Dropdown>
    </>
  );
};

export default Navigation;
