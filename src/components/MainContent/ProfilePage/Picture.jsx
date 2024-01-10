import React, { useState, useContext } from "react";
import Profile from "../../../assets/blank-profile.png";
import { Modal } from "antd";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../../firebase";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { UserDataContext } from "../../../Context/Context";
import { GrUpload } from "react-icons/gr";
import { Dropzone, FileMosaic } from "@files-ui/react";

const Picture = () => {
  const [files, setFiles] = useState([]);
  const updateFiles = (e) => {
    setFiles(e);
  };

  const { userData, setUserData } = useContext(UserDataContext);
  const [isHovered, setIsHovered] = useState(false);
  const uid = localStorage.getItem("uid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const photoName = userData.FullName;
  const handleOk = async () => {
    if (!files) {
      console.log("No valid files selected for upload");
      return;
    }

    const name = photoName;

    try {
      const file = files[0].file;
      const date = new Date().getTime();
      const storageRef = ref(storage, name + "_" + date);

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
              const newPhotoURL = downloadURL;

              const userPostsRef = collection(
                db,
                "personal-info",
                uid,
                "posts"
              );

              const querySnapshot = await getDocs(userPostsRef);

              querySnapshot.forEach(async (doc) => {
                const postRef = doc.ref;
                await setDoc(
                  postRef,
                  {
                    photoURL: newPhotoURL,
                  },
                  { merge: true }
                );
              });
              setUserData({ ...userData, photoURL: newPhotoURL });

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
  const imageUrl = userData
    ? userData.photoURL
    : localStorage.getItem("photoURL");

  return (
    <div>
      <div
        className="upload-cont"
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
      >
        <img
          onClick={showModal}
          src={imageUrl || Profile}
          alt="profile-img"
          className="profilePageImg"
        />
        {/* {isHovered && <GrUpload className="upload" />} */}
      </div>
      <Modal
        title="Choose profile picture"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <Dropzone
            onChange={updateFiles}
            value={files}
            accept="image/*"
            maxFiles={1}
            footer={false}
          >
            {files.map((file) => (
              <>
                <FileMosaic {...file} key={file.id} preview />
              </>
            ))}
          </Dropzone>
        </div>
      </Modal>
    </div>
  );
};

export default Picture;
