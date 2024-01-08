import React, { useContext } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import Profile from "../../../../assets/blank-profile.png";
import Posts from "../../../../assets/story.png";
import { AiTwotoneLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { PiShareFatThin } from "react-icons/pi";
import { UserDataContext } from "../../../../Context/Context";

const Post = () => {
  const { userData } = useContext(UserDataContext);

  return (
    <div className="Post">
      <div className="post-head">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {userData.photoURL ? (
            <img
              style={{
                width: 40,
                height: 40,
                borderRadius: "50px",
                marginLeft: 10,
                marginRight: 20,
              }}
              src={userData.photoURL}
              alt="profile"
            />
          ) : (
            <img
              style={{
                width: 40,
                height: 40,
                borderRadius: "50px",
                marginLeft: 10,
                marginRight: 20,
              }}
              src={Profile}
              alt="profile"
            />
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <span style={{ marginTop: "5px", fontSize: 18 }}>
              {userData.FullName}
            </span>
            <p style={{ fontSize: 11, marginTop: "-1px" }}>
              30 September at 04:45
            </p>
          </div>
        </div>
        <div>
          <BiDotsHorizontalRounded className="post-head-icon" size={20} />
          <RxCross2 className="post-head-icon" size={20} />
        </div>
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
        reprehenderit, nam ipsum saepe asperiores molestiae modi unde minus vel
        accusantium repudiandae laudantium commodi veritatis aspernatur soluta
        ab, numquam quam. Architecto?
      </div>
      <div>
        <img src={Posts} alt="post" className="post-img" />
      </div>
      <div className="like-comment">
        <div>
          <AiTwotoneLike size={20} color="blue" />
          <span>1k likes</span>
        </div>
        <div>
          <span>1.5k comments</span> &nbsp;&nbsp;
          <span>500 shares</span>
        </div>
      </div>
      <div className="post-btn">
        <div className="like-btn">
          <AiOutlineLike size={20} />
          <span>Like</span>
        </div>
        <div className="like-btn">
          <FaRegComment size={20} />
          <span>Comment</span>
        </div>
        <div className="like-btn">
          <PiShareFatThin size={20} />
          <span>Share</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
