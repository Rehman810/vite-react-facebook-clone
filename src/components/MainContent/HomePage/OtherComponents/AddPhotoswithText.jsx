import React, { useContext, useState } from "react";
import Profile from "../../../../assets/blank-profile.png";
import { MdPhotoLibrary } from "react-icons/md";
import { UserDataContext } from "../../../../Context/Context";
import { Button, Modal } from "antd";
import { db, auth, storage } from "../../../../firebase";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AiOutlinePlus } from "react-icons/ai";
import { Dropzone, FileMosaic } from "@files-ui/react";

const AddPhotoswithText = () => {
  const [files, setFiles] = useState([]);
  const updateFiles = (e) => {
    setFiles(e);
  };
  const { userData } = useContext(UserDataContext);
  const [postText, setPostText] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // const [file, setFile] = useState(null);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    Post();
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   setFile(selectedFile);
  // };
  const currentDate = new Date();
  const oneMonthLater = new Date(currentDate);
  oneMonthLater.setMonth(currentDate.getMonth() + 1);

  var now = new Date();

  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Octuber",
    "November",
    "December",
  ];
  const month = monthName[now.getMonth()];
  const day = new Date().getDate();
  const year = now.getFullYear();

  const date = `${month} ${day}, ${year}`;
  const Post = async () => {
    try {
      const currentUserId = auth.currentUser.uid;

      const userPostsCollectionRef = collection(
        db,
        "personal-info",
        currentUserId,
        "posts"
      );

      const randomNumber = Math.floor(Math.random() * 1000);
      const photoName = randomNumber.toString();

      if (!files) {
        console.log("No valid files selected for upload");
        return;
      }

      const name = photoName;

      try {
        const file = files[0].file;
        const storageRef = ref(storage, name + "_" + date);

        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            console.error("Error uploading file:", error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                const newPostRef = await addDoc(userPostsCollectionRef, {
                  text: postText,
                  date: date,
                  postURL: downloadURL,
                  name: userData.FullName,
                  photoURL: userData.photoURL,
                  timestamp: serverTimestamp(),
                });
              }
            );
          }
        );
      } catch (e) {
        console.error("Error uploading file:", e);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setPostText("");
  };
  return (
    <div>
      <div className="write-btn" onClick={showModal}>
        <MdPhotoLibrary color="green" size={20} />
        <span className="post-txt">Photo/video</span>
      </div>
      <Modal
        open={open}
        title="Create post"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Post
          </Button>,
        ]}
      >
        <div>
          <div className="sidebar">
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
            <span style={{ fontWeight: "bold" }}>{userData.FullName}</span>
          </div>
          <input
            type="text"
            className="post-inp"
            placeholder={`What's on your mind, ${userData.FullName}?`}
            onChange={(e) => setPostText(e.target.value)}
          />
          <div>
            {/* <label htmlFor="fileInput" className="upload">
              <AiOutlinePlus />
              <span>Upload Photo</span>
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            /> */}
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
        </div>
      </Modal>
    </div>
  );
};

export default AddPhotoswithText;
