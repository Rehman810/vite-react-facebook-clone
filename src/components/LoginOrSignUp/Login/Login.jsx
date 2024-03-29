import React, { useState } from "react";
import Facebook from "../../../assets/facebook.png";
import { Input } from "antd";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingBar from "react-top-loading-bar";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const Signup = () => {
    navigate("/signup");
  };

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const Login = async () => {
    setProgress(50);
    try {
      const e = await signInWithEmailAndPassword(auth, email, password);

      onAuthStateChanged(auth, (user) => {
        if (user) {
          localStorage.setItem("uid", e.user.uid);
          setProgress(100);
          setTimeout(() => {
            navigate("/");
          }, 200);
        } else {
          console.log("User not found");
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Try Again",
        text: "Wrong email or password!",
      });
      console.error(error);
      setProgress(100);
    }
  };

  return (
    <div className="main-login">
      <LoadingBar
        color="blue"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="login">
        <img src={Facebook} alt="facebook" className="facebook" />
        <div className="login-box">
          <span style={{ fontSize: 20 }}>Log in to Facebook</span>
          <div style={{ marginTop: 20 }}>
            <Input
              placeholder="Email address or phone number"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input.Password
              placeholder="Password"
              style={{ marginTop: 10 }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <span className="login-btn" onClick={() => Login()}>
            Log in
          </span>
          <div className="Other-btn">
            <span className="login-bottom-btn">Forgotten account?</span>
            <span className="login-bottom-btn" onClick={() => Signup()}>
              Sign up for Facebook
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
