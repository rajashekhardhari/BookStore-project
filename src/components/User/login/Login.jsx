import React from "react";
import book from "../../../assets/icons/Group 5.svg";
import { useState } from "react";
import "./Login.css";
import UserRegistrationService from "../../../services/UserRegistrationService";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { Paper } from "@mui/material";
import homeImg from "../../../assets/icons/icons8-home-64.png";
import FormDialog from "../Otp/Otp";


export default function Login(props) {
  const [otpVerify,setOtpVerify]=useState(false);
//const [open,setOpen]=useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [alerts, setAlerts] = useState({
    severity: "",
    message: "",
    alertFlag: false,
  });

  const handleLoginInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
    console.log(user);
  };

  function loginHandler(e) {
    e.preventDefault();
    let loginUser = {
      email: user.email,
      password: user.password,
      role: user.role,
    };
    UserRegistrationService.loginUser(loginUser)
      .then((response) => {
        // alert(response.data.message);
        console.log(response);
        setOtpVerify(false);
        let token = response.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("email", user.email);
        setAlerts({
          ...alerts,
          severity: "success",
          message: response.data.message,
          alertFlag: true,
        });
        if (user.role === "seller") {
          props.history.push({
            pathname: "/addBook",
          });
        }
        if (user.role === "user") {
          props.history.push({
            pathname: "/home",
          });
        }
      })
      .catch((error) => {
        if (error.response.data.data === "Please verify your email before proceeding") {
          setOtpVerify(true);

        }
        alert(error.response.data.data);
        setAlerts({
          ...alerts,
          severity: "error",
          message: error.response.data.data,
          alertFlag: true,
        });
      });
  }

  const alertCloseHandler = (event, reason) => {
    if (reason === "clickAway") return;
    setAlerts({ ...alerts, alertFlag: false });
  };


  const verifyHandler = ()=>{
    //  setOpen(true);
  }

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
            <Button
              variant="contained"
              className="signUp-link link"
              to="/signUp"
              onClick={() => {
                props.history.push({
                  pathname: "/signUp",
                });
              }}
            >
              signup
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
      <div className="main">
        <Paper elevation={20} className="form-content-login">
          {alerts.alertFlag && (
            <Alert onClose={alertCloseHandler} severity={alerts.severity}>
              {alerts.message}
            </Alert>
          )}

          <form action="" className="form-login" onSubmit={loginHandler}>
            <div className="form-head-content">
              <div className="form-head">BookStore Login</div>
            </div>
            <div className="row-content-login">
              <TextField
                required
                type="text"
                id="outlined-required"
                label="Email"
                name="email"
                className="input-login"
                onChange={handleLoginInput}
              />
            </div>
            <div className="row-content-login">
              <TextField
                id="outlined-password-input"
                label="Password *"
                type="password"
                name="password"
                className="input-login"
                autoComplete="current-password"
                onChange={handleLoginInput}
              />
            </div>

            <div className="row-content-login">
              <label htmlFor="">
                Seller
                <input
                  type="checkbox"
                  name="role"
                  value="seller"
                  onChange={handleLoginInput}
                  defaultValue="user"
                />
              </label>
              <label htmlFor="">
                User
                <input
                  type="checkbox"
                  name="role"
                  value="user"
                  onChange={handleLoginInput}
                  defaultValue="user"
                />
              </label>
            </div>

            <div className="row-content-login">
              <Button
                type="submit"
                className="login"
                variant="contained"
                color="success"
              >
                Login
              </Button>

              {otpVerify&&<Button
                type="button"
                className="login"
                variant="text"
                color="primary"
                onClick={verifyHandler}
              >
                Verify
              </Button>}
            </div>
            <div className="row-content-login links">
              <Link to="/signUp" className="link">
                SignUp
              </Link>
              <div>
                <Link className="link" to="/forgotPassword">
                  Forgot Password?
                </Link>

              </div>
            </div>
          </form>
        </Paper>
      </div>
      {otpVerify&&<FormDialog />}
    </div>
  );
}
