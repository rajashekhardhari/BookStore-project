import React, { useState } from "react";
import book from "../../../assets/icons/Group 5.svg";
import "./SignUp.css";
import UserRegistrationService from "../../../services/UserRegistrationService";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DirectionSnackbar from "../../utils/SnackBar";
import homeImg from "../../../assets/icons/icons8-home-64.png";

export default function SignUp(props) {
  const [snackBar, setsnackBar] = useState({
    snackFlag: false,
    snackMessage: "",
    severity: "",
  });
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    kyc: "",
    dob: "",
    email: "",
    role: "",
    password: "",
    createdDate: "",
    isVerified: false,
  });

  const signUp = (e) => {
    e.preventDefault();
    let userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      kyc: user.kyc,
      dob: user.dob,
      email: user.email,
      password: user.password,
      role: user.role,
    };

    UserRegistrationService.registerUser(userData)
      .then((response) => {
        setsnackBar({
          ...snackBar,
          snackFlag: true,
          snackMessage: response.data.message,
          severity: "success",
        });
        alert(response.data.message);
        resetHandler();
      })
      .catch((response) => {
        alert(response.response.data.data);
        setsnackBar({
          ...snackBar,
          snackFlag: true,
          snackMessage: response.response.data.data,
          severity: "error",
        });
      });
  };

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
    console.log([name] + " ", value);
  };

  const resetHandler = () => {
    setUser({
      ...user,
      firstName: "",
      lastName: "",
      kyc: "",
      dob: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      createdDate: "",
      isVerified: false,
    });
  };

  return (
    <div>
      <header className="header-content header">
        <div className="logo-content-home">
          <img
            src={book}
            alt="logo-content"
            className="logo-content-img"
            width=""
          />
          <span className="logo-content-home-links">
            <Button sx={{color:"blue",backgroundColor:"yellow"}} variant="contained" className="login-link link" onClick={() => {
                  props.history.push({
                    pathname: "/login",
                  });
                }}>
              login{" "}
            </Button>
            <div>
              <img
                src={homeImg}
                alt=""
                style={{ width: "50%", marginLeft: "20px",cursor:"pointer" }}
                onClick={() => {
                  props.history.push({
                    pathname: "/dashHome",
                  });
                }}
              />
            </div>
          </span>
        </div>
      </header>

      <div className="form-content">
        <form
          action="#"
          className="form"
          onSubmit={signUp}
          onReset={resetHandler}
        >
          <div className="form-head-content">
            <div className="form-head">BookStore SignUp</div>
          </div>

          <div className="row-content">
            <TextField
              className="input"
              label="FirstName*"
              type="text"
              id="outlined-required"
              placeholder="FirstName*"
              name="firstName"
              value={user.firstName}
              onChange={handleUserInput}
            />
            <TextField
              className="input"
              type="text"
              placeholder="LastName*"
              label="LastName*"
              name="lastName"
              value={user.lastName}
              onChange={handleUserInput}
            />
          </div>

          <div className="row-content">
            <TextField
              className="input"
              type="text"
              placeholder="email*"
              label="email*"
              name="email"
              value={user.email}
              onChange={handleUserInput}
            />
            <TextField
              className="input"
              type="password"
              placeholder="password*"
              label="Password*"
              name="password"
              value={user.password}
              onChange={handleUserInput}
            />
          </div>

          <div className="row-content">
            <TextField
              className="input"
              type="password"
              placeholder="Confirm password*"
              label="Confirm password*"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleUserInput}
            />
            <TextField
              className="input"
              type="text"
              placeholder="Role*"
              label="Role *"
              name="role"
              value={user.role}
              onChange={handleUserInput}
            />
          </div>

          <div className="row-content">
            <TextField
              className="input"
              // type="date"
              type="text"
              label="Date Of Birth*"
              placeholder="yyyy-MM-dd"
              name="dob"
              value={user.dob}
              onChange={handleUserInput}
            />
            <TextField
              className="input"
              type="text"
              placeholder="KYC*"
              label="KYC*"
              name="kyc"
              value={user.kyc}
              onChange={handleUserInput}
            />
          </div>

          <div className="row-content">
            <Button
              type="submit"
              className="submit-button button addButton"
              variant="contained"
              color="success"
            >
              SignUp
            </Button>
            <Button
              type="reset"
              className="reset-button button resetButton"
              variant="contained"
              color="success"
            >
              Reset
            </Button>
          </div>
          <div className="row-content">
            <Link to="/login" className="link">
              Click Here to Login
            </Link>
          </div>
        </form>
      </div>
      {snackBar.snackFlag && (
        <DirectionSnackbar
          message={snackBar.snackMessage}
          severity={snackBar.severity}
          flag={snackBar.snackFlag}
        />
      )}
    </div>
  );
}
