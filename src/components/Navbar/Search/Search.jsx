import React, { useState, useEffect, useContext } from "react";
import SearchIcon from "../../../assets/search.svg";
import { db } from "../../../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { UserDataContext } from "../../../Context/Context";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const Search = () => {
  const { setOtherUserData } = useContext(UserDataContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [state, setState] = useState({
    query: "",
    list: [],
  });

  const fetchPost = async () => {
    await getDocs(collection(db, "personal-info")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(newData);
    });
  };

  const handleChange = (e) => {
    const query = e.target.value;
    const results = users.filter((user) => {
      return user.FullName.toLowerCase().includes(query.toLowerCase());
    });
    setState({
      query: query,
      list: results,
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const OtherUserProfile = async (id) => {
    try {
      const userDocRef = doc(db, "personal-info", id);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        setOtherUserData(userData);
        navigate("/otherProfile");
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error fetching user details: ", error);
    }
  };
  return (
    <div>
      <div className="search">
        <img src={SearchIcon} alt="search-icon" />
        <input
          className="search-input"
          type="text"
          placeholder="Search Facebook"
          onChange={handleChange}
        />
      </div>
      <div
        className="search-results"
        style={{
          display: state.query && state.list.length === 0 ? "none" : "block",
        }}
      >
        {state.query
          ? state.list.map((user, index) => (
              <li className="search-list" key={index}>
                <div
                  onClick={() => {
                    OtherUserProfile(user.id);
                  }}
                >
                  <img
                    style={{ width: 40, height: 40, borderRadius: 50 }}
                    src={user.photoURL}
                    alt={user.FullName + "'s Picture"}
                  />
                  <span>{user.FullName}</span>
                </div>
              </li>
            ))
          : null}
      </div>
    </div>
  );
};

export default Search;
