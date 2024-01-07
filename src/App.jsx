import "./App.css";
import Home from "./components/Home";
import Login from "./components/LoginOrSignUp/Login/Login";
import SignUp from "./components/LoginOrSignUp/SIgnUp/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected from "./Protected";
import Profile from "./components/MainContent/ProfilePage/Profile";
import OtherUserProfile from "./components/MainContent/ProfilePage/OtherUsersProfile";
import { UserDataContext } from "./Context/Context";
import { useContext } from "react";

function App() {
  const { userData } = useContext(UserDataContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path={`/profilePage/:${userData.uid}`}
            // path="/profilePage"
            element={<Protected Component={Profile} />}
          />
          <Route
            path="/otherProfile"
            // path={`/otherProfile/:${userData.uid}`}
            element={<Protected Component={OtherUserProfile} />}
          />
          <Route path="/" element={<Protected Component={Home} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
