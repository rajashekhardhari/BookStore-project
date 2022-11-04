import React, { useState } from "react";
import "./ForgotPassword.css";
import book from "../../../assets/icons/Group 5.svg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import UserRegistrationService from "../../../services/UserRegistrationService";

export default function ForgotPassword(props) {
  const [email, setEmail] = useState("");

  const getResetLink = (e) => {
    e.preventDefault();
    UserRegistrationService.getResetLink(email)
      .then((response) => {
        alert(response.data.data);
        setEmail("");
        props.history.push({
          pathname: "/resetPassword"
        })
      })
      .catch((error) => {
        alert(error.response.data.data);
      });
  };

  const forgotHandler = (e) => {
    let value = e.target.value;
    setEmail(value);
    console.log(value);
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

      <Card sx={{ minWidth: 275 }} className="card">
        <form action="" className="form-login" onSubmit={getResetLink}>
          <div className="form-head-content">
            <div className="form-head">Forgot Password</div>
          </div>
          <div className="row-content">
            <TextField
              id="standard-basic"
              label="Enter Your Email *"
              variant="standard"
              className="input-forgot"
              name="email"
              value={email}
              onChange={forgotHandler}
            />
          </div>
          <div className="row-content">
            <Button className="input-forgot" type="submit" variant="contained">
              Get Reset Link
            </Button>
          </div>
          <div className="row-content">
            <Link className="link"  to="/resetPassword">reset Password?</Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
