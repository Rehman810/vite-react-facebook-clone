import "./App.css";
import Home from "./components/Home";
import Login from "./components/LoginOrSignUp/Login";
import SignUp from "./components/LoginOrSignUp/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected from "./Protected";
import Profile from "./components/MainContent/ProfilePage/Profile";
import { UserDataProvider } from "./Context/Context";

function App() {
  return (
    <div className="App">
      <UserDataProvider>
        <BrowserRouter>
          <Routes>
            <>
              <Route
                // path={`/profilePage/:${userData.uid}`}
                path="/profilePage"
                element={<Protected Component={Profile} />}
              />
              <Route path="/" element={<Protected Component={Home} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              {/* <Route index path="/page1/*" element={<UsesPages />} />
            <Route path="/page2/*" element={<NonUserPages />} /> */}
            </>
          </Routes>
        </BrowserRouter>
      </UserDataProvider>
    </div>
  );
}

export default App;
