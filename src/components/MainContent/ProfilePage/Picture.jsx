import React, { useState, useContext } from "react";
import ProfileImg from "../../../assets/blank-profile.png";
import { Modal } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../../firebase";
import { addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { UserDataContext } from "../../../Context/Context";

const Picture = () => {
  const { userData } = useContext(UserDataContext);

  const [file, setFile] = useState(null);
  const uid = localStorage.getItem("uid");
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const photoName = userData.FullName;
  const handleOk = async () => {
    if (!file) {
      return;
    }

    const name = photoName;

    try {
      // Generate a timestamp for the file name
      const date = new Date().getTime();
      const storageRef = ref(storage, name + "_" + date);

      // Upload the selected file to Firebase Storage
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Error uploading file:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const userDocRef = doc(db, "personal-info", auth.currentUser.uid);

            try {
              await setDoc(
                userDocRef,
                {
                  photoURL: downloadURL,
                },
                { merge: true }
              );
              console.log("Document field updated successfully!");
            } catch (error) {
              console.error("Error updating document field:", error);
            }

            console.log(
              "File uploaded successfully, downloadURL:",
              downloadURL
            );
          });
        }
      );
    } catch (e) {
      console.error("Error uploading file:", e);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div>
        {userData.photoURL ? (
          <img
            onClick={showModal}
            src={userData.photoURL}
            alt="profile-img"
            className="profilePageImg"
          />
        ) : (
          <img
            onClick={showModal}
            src={ProfileImg}
            alt="profile-img"
            className="profilePageImg"
          />
        )}
      </div>
      <Modal
        title="Choose profile picture"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <label htmlFor="fileInput" className="upload">
            <AiOutlinePlus />
            <span>Upload Photo</span>
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Picture;
