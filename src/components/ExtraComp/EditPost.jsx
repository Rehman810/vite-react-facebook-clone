import React, { useContext, useState } from "react";
import { Dropdown } from "antd";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Edit from "./EditPostComp";
import { doc, collection, deleteDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../../firebase";
import { UserDataContext } from "../../Context/Context";

const EditPost = () => {
  const { postId } = useContext(UserDataContext);
  const handleDeleteField = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This Post will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const uid = localStorage.getItem("uid");
          const userPostsCollectionRef = collection(
            db,
            "personal-info",
            uid,
            "posts"
          );
          const docRef = doc(userPostsCollectionRef, postId); // Reference to the specific document
          await deleteDoc(docRef);
          Swal.fire("Deleted!", "Post has been deleted.", "success");
          // setUserPosts((prevPosts) =>
          //   prevPosts.filter((post) => post.id !== id)
          // );
        } catch (error) {
          console.error("Error deleting document:", error);
          Swal.fire(
            "Error",
            "An error occurred while deleting the post.",
            "error"
          );
        }
      }
    });
  };
  const items = [
    {
      label: <Edit />,
      key: "0",
    },
    {
      label: (
        <div className="navIcon" onClick={() => handleDeleteField()}>
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
