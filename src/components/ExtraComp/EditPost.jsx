import React, { useContext, useState } from "react";
import { Dropdown } from "antd";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Edit from "./EditPostComp";

const EditPost = () => {
  const items = [
    {
      label: <Edit />,
      key: "0",
    },
    {
      label: (
        <div className="navIcon">
          <MdDelete size={20} />
          <span className="navText">Delete Post</span>
        </div>
      ),
      key: "1",
    },
  ];
  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
      >
        <BiDotsHorizontalRounded className="post-head-icon" size={35} />
      </Dropdown>
    </>
  );
};

export default EditPost;
