import { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { doc, updateDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { Input } from "antd";
import { CiEdit } from "react-icons/ci";
import { UserDataContext } from "../../Context/Context";

function Edit(props) {
  const { postId, postText, onUpdate } = useContext(UserDataContext);
  const [postTextCo, setPostText] = useState(postText);
  const [id, setId] = useState("");
  const [rollNum, setRollNum] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleEdit = () => {
    setShow(true);
  };
  useEffect(() => {
    console.log(postTextCo, postId);
  }, []);
  const uid = localStorage.getItem("uid");
  const handleSave = async (e) => {
    e.preventDefault();
    const userPostsCollectionRef = collection(
      db,
      "personal-info",
      uid,
      "posts"
    );
    const docRef = doc(userPostsCollectionRef, postId);
    try {
      await updateDoc(docRef, {
        text: postTextCo,
        // photoURL: rollNum,
      });
      setShow(false);
      console.log("Document field updated successfully!");
      // onSnapshot(docRef, (doc) => {
      //   onUpdate((prevPosts) => {
      //     const updatedPosts = prevPosts.map((post) =>
      //       post.id === postId ? { ...post, text: postTextCo } : post
      //     );
      //     return updatedPosts;
      //   });
      //   setShow(false);
      //   console.log("Document field updated successfully!");
      // });
    } catch (error) {
      console.error("Error updating document field:", error);
    }
  };
  return (
    <>
      <div className="navIcon" onClick={handleEdit}>
        <CiEdit size={20} />
        <span className="navText">Edit Post</span>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Post Text</Form.Label>
              <Input
                value={postTextCo}
                className="inp"
                placeholder="Edit Post Text"
                onChange={(e) => setPostText(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Roll Num</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={rollNum}
                onChange={(e) => setRollNum(e.target.value)}
              />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => handleSave(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit;
