import React from "react";
import book from "../../../assets/icons/Group 5.svg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./ResetPassword.css";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import { useState } from "react";
import UserRegistrationService from "../../../services/UserRegistrationService";

export default function ResetPassword() {
  const [passwordDetails, SetPasswordDetails] = useState({
    newPassword: "",
    confirmPassword: "",
    token: "",
  });

  const resetHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    SetPasswordDetails({ ...passwordDetails, [name]: value });
    console.log(passwordDetails)
  };

  const resetPassword = (e) => {

    e.preventDefault();
    UserRegistrationService.resetPassword(
      passwordDetails.token,
      passwordDetails.newPassword,
      passwordDetails.confirmPassword)
    .then((response)=>{
      alert(response.data.message)
      SetPasswordDetails({
        ...passwordDetails,newPassword: "",
        confirmPassword: "",
        token: "",
      })
    })
    .catch((error) => {
     alert(error.response.data.data)
    });

  };

  return (
    <div>
      <header className="header-content header">
        <div className="logo-content">
          <img
            src={book}
            alt="logo-content"
            className="logo-content-img"
            width=""
          />
        </div>
      </header>
      <Card className="card-reset">
        <form method="post" action="" onSubmit={resetPassword}>
          <div className="form-head-content">
            <div className="form-head">User Reset Password</div>
          </div>
          <div className="row-content-reset">
            <TextField
            required
              id="outlined-password-input"
              label="New Password"
              type="password"
              name="newPassword"
              value={passwordDetails.newPassword}
              className="input-reset"
              autoComplete="current-password"
              onChange={resetHandler}
            />
          </div>
          <div className="row-content-reset">
            <TextField
            required
              id="outlined-password-input"
              label="Confirm new password"
              type="password"
              name="confirmPassword"
              value={passwordDetails.confirmPassword}
              className="input-reset"
              autoComplete="current-password"
              onChange={resetHandler}
            />
          </div>

          <div className="row-content-reset">
            <TextField
            required
              type="text"
              id="outlined-required"
              label="Password Token"
              name="token"
              value={passwordDetails.token}
              className="input-reset"
              onChange={resetHandler}
            />
          </div>
          <div className="row-content-reset">
            <Button
              type="submit"
              className="reset"
              variant="contained"
              color="success"
            >
              Submit
            </Button>
          </div>
          <div className="reset-password">
            <Link className="link" to="/forgotPassword">forgot Password?</Link>
            <Link className="link" to="/login">login</Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
