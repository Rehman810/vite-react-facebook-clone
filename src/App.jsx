import "./App.css";
import Home from "./components/Home";
import Login from "./components/LoginOrSignUp/Login";
import SignUp from "./components/LoginOrSignUp/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected from "./Protected";
import Profile from "./components/MainContent/ProfilePage/Profile";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useContext } from "react";
import { UserDataContext, UserDataProvider } from "./Context/Context";
import UsesPages from "./Pages/UsesPages";
import NonUserPages from "./Pages/NonUserPages";

function App() {
  const userData = useContext(UserDataContext);

  return (
    <div className="App">
      {/* <UserDataProvider> */}
      <BrowserRouter>
        <Routes>
          <>
            {/* <Route
              // path={`/profilePage/:${userData.uid}`}
              path="/profilePage"
              element={<Protected Component={Profile} />}
            />
            <Route path="/" element={<Protected Component={Home} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} /> */}
            <Route index path="/page1/*" element={<UsesPages />} />
            <Route path="/page2/*" element={<NonUserPages />} />
          </>
        </Routes>
      </BrowserRouter>
      {/* </UserDataProvider> */}
    </div>
  );
}

export default App;
