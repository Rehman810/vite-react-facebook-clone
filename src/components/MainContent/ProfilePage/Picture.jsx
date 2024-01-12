import React, { useState, useContext } from "react";
import Profile from "../../../assets/blank-profile.png";
import { Modal } from "antd";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../../firebase";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { UserDataContext } from "../../../Context/Context";
import { GrUpload } from "react-icons/gr";
import { Dropzone, FileMosaic } from "@files-ui/react";
import { FullScreen, ImagePreview } from "@files-ui/react"; // Import FullScreen and ImagePreview

const Picture = () => {
  const [files, setFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = React.useState(undefined);
  const handleSee = (imageSource) => {
    setImgSrc(imageSource);
  };
  const { userData, setUserData } = useContext(UserDataContext);
  const uid = localStorage.getItem("uid");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (!files || !files[0]) {
      console.log("No valid files selected for upload");
      return;
    }

    const name = userData.FullName;

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
      <div className="upload-cont">
        <img
          onClick={showModal}
          src={imageUrl || Profile}
          alt="profile-img"
          className="profilePageImg"
        />
      </div>
      <Modal
        title="Choose profile picture"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <Dropzone
            onChange={(e) => setFiles(e)}
            value={files}
            accept="image/*"
            maxFiles={1}
            footer={false}
          >
            {files.map((file, index) => (
              <FileMosaic {...file} key={index} preview onSee={handleSee} />
            ))}
          </Dropzone>
        </div>
      </Modal>

      {/* FullScreen component for preview */}
      <FullScreen
        open={imgSrc !== undefined}
        onClose={() => setImgSrc(undefined)}
      >
        <ImagePreview src={imgSrc} />
      </FullScreen>
    </div>
  );
};

export default Picture;
