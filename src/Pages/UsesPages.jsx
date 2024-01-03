// import React, { useContext, useEffect } from "react";
// import Home from "../components/Home";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import Protected from "../Protected";
// import Profile from "../components/MainContent/ProfilePage/Profile";
// import { UserDataProvider } from "../Context/Context";
// import { UserDataContext } from "../Context/Context";
// import { useNavigate } from "react-router-dom";

// const UsesPages = () => {
//   const userData = useContext(UserDataContext);
//   const uid = localStorage.getItem("uid");
//   let navigate = useNavigate();
//   const navig = () => {
//     navigate("/login");
//   };
//   return (
//     <UserDataProvider>
//       <BrowserRouter>
//         <Routes>
//           {uid ? (
//             <>
//               {/* <Route
//                 //   path={`/profilePage/:${userData.uid}`}
//                 path="/profilePage"
//                 element={<Protected Component={Profile} />}
//               />
//               <Route path="/" element={<Protected Component={Home} />} /> */}
//               <Route path="/profilePage" element={<Profile />} />
//               <Route path="/" element={<Home />} />
//             </>
//           ) : (
//             navig()
//           )}
//         </Routes>
//       </BrowserRouter>
//     </UserDataProvider>
//   );
// };

// export default UsesPages;

import React, { useContext } from "react";
import Home from "../components/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profile from "../components/MainContent/ProfilePage/Profile";
import { UserDataProvider } from "../Context/Context";
import { UserDataContext } from "../Context/Context";
import Protected from "../Protected";
import OtherUserProfile from "../components/MainContent/ProfilePage/OtherUsersProfile";

const UsesPages = () => {
  // const userData = useContext(UserDataContext);
  const uid = localStorage.getItem("uid");

  return (
    <UserDataProvider>
      <Routes>
        <Route
          path="/profilePage"
          element={<Protected Component={Profile} />}
        />
        <Route
          path="/otherProfile"
          element={<Protected Component={OtherUserProfile} />}
        />
        <Route path="/" element={<Protected Component={Home} />} />
      </Routes>
    </UserDataProvider>
  );
};

export default UsesPages;
