import React, { useState } from "react";
import Facebook from "../../../assets/facebook.png";
import { Input } from "antd";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../../../firebase";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import "./SignUp.css";

const SignUp = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [progress, setProgress] = useState(0);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [surName, setSurName] = useState();

  const navigate = useNavigate();
  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const handleDayChange = (e) => {
    setDay(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const fullName = firstName + " " + surName;
  const dateOfBirth = `${day} ${month}, ${year}`;

  const Signup = async () => {
    setProgress(50);
    return await createUserWithEmailAndPassword(auth, email, password)
      .then((e) => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            localStorage.setItem("uid", e.user.uid);
            try {
              const userDocRef = doc(db, "personal-info", e.user.uid);
              await setDoc(userDocRef, {
                FirstName: firstName,
                SurName: surName,
                FullName: fullName,
                DOB: dateOfBirth,
                Gender: selectedValue,
                photoURL: "",
                uid: e.user.uid,
                DateofRegister: serverTimestamp(),
              });
            } catch (e) {
              console.error("Error adding document: ", e);
            }
            setProgress(100);
            setTimeout(() => {
              navigate("/");
            }, 200);
          } else {
            setProgress(50);
            console.log("user not found", user.uid);
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Try Again",
          text: "Wrong email or password!",
        });
        console.log(error);
      });
  };

  const Login = () => {
    navigate("/login");
  };

  return (
    <div className="main-signup">
      <LoadingBar
        color="blue"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="login signup">
        <img src={Facebook} alt="facebook" className="facebook" />
        <div className="login-box">
          <span style={{ fontSize: 30, fontWeight: "bold" }}>
            Create a new account
          </span>
          <span
            style={{
              fontSize: 14,
              color: "#8F949A",
              marginTop: 10,
            }}
          >
            It's quick and easy.
          </span>
          <div className="inp">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Input
                style={{ marginRight: 10 }}
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                style={{ marginLeft: 10 }}
                placeholder="Surname"
                onChange={(e) => setSurName(e.target.value)}
              />
            </div>
            <Input
              style={{ marginTop: 10 }}
              placeholder="Mobile number or email address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input.Password
              placeholder="New password"
              style={{ marginTop: 10 }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <span className="dob">Date of birth</span>
          <div className="date-of-birth-dropdown">
            <select
              className="dob-select"
              value={day}
              onChange={handleDayChange}
            >
              <option value="" disabled>
                Day
              </option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <select
              className="dob-select"
              value={month}
              onChange={handleMonthChange}
            >
              <option value="" disabled>
                Month
              </option>
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              className="dob-select"
              value={year}
              onChange={handleYearChange}
            >
              <option value="" disabled>
                Year
              </option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <span
            style={{
              width: "100%",
              textAlign: "left",
              fontSize: 12,
              marginTop: 10,
            }}
          >
            Gender
          </span>

          <div className="date-of-birth-dropdown">
            <div className="dob-select">
              <input
                type="radio"
                value="Female"
                checked={selectedValue === "Female"}
                onChange={handleRadioChange}
              />
               <label style={{ fontSize: 14 }}>Female</label>
            </div>
            <div className="dob-select">
              <input
                type="radio"
                value="Male"
                checked={selectedValue === "Male"}
                onChange={handleRadioChange}
              />
               <label style={{ fontSize: 14 }}>Male</label>
            </div>
            <div className="dob-select">
              <input
                type="radio"
                value="Custom"
                checked={selectedValue === "Custom"}
                onChange={handleRadioChange}
              />
               <label style={{ fontSize: 14 }}>Custom</label>
            </div>
          </div>

          <p style={{ fontSize: 12 }}>
            People who use our service may have uploaded your contact
            information to Facebook
          </p>
          <p style={{ fontSize: 12 }}>
            By clicking Sign Up, you agree to our Terms, Privacy Policy and
            Cookies Policy. You may receive SMS notifications from us and can
            opt out at any time.
          </p>
          <span className="login-btn signupbtn" onClick={() => Signup()}>
            Sign Up
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <span className="login-bottom-btn" onClick={() => Login()}>
              Already have an account?
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
