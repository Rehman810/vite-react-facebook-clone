import React, { useContext, useState, useEffect } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { AiTwotoneLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";

import { Skeleton } from "antd";

const Skeleton = () => {
  return (
    <>
      <div className="Post">
        <div className="post-head">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Skeleton.Avatar />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <span style={{ marginTop: "5px", fontSize: 18 }}>
                <Skeleton active />
              </span>
              <p style={{ fontSize: 11, marginTop: "-1px" }}>{a.date}</p>
            </div>
          </div>
          <div>
            <BiDotsHorizontalRounded className="post-head-icon" size={20} />
            <RxCross2 className="post-head-icon" size={20} />
          </div>
        </div>
        <p>
          <Skeleton active />
        </p>
        <div>
          <Skeleton.Image active />
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
    </>
  );
};

export default Skeleton;
