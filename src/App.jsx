import "./App.css";
import Login from "./components/User/login/Login";
import SignUp from "./components/User/signUp/SignUp";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ResetPassword from "./components/User/reset password/ResetPassword";
import ForgotPassword from "./components/User/forgot password/ForgotPassword";
import Home from "./components/User/home/Home";
import AddBook from "./components/Book/AddBook/AddBook";
//import { Snackbar } from "@mui/material";
import DirectionSnackbar from "./components/utils/SnackBar";
import DashBoardHomePage from "./components/DashBoardHomePage/DashBoardHomePage";
import Dummy from "./components/extras/Dummy";
import Cart from "./components/Cart/Cart";
import PlaceOrder from "./components/Order/PlaceOrder";
import FormDialog from "./components/User/Otp/Otp";
import React from "react";

function App() {
  return (
    
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/" component={DashBoardHomePage}></Route>
          <Route path="/signUp" component={SignUp}></Route>
          <Route path="/resetPassword" component={ResetPassword}></Route>
          <Route path="/forgotPassword" component={ForgotPassword}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/addBook" component={AddBook}></Route>
          <Route path="/snack" component={DirectionSnackbar}></Route>
          <Route path="/dashHome" component={DashBoardHomePage}></Route>
          <Route path="/dummy" component={Dummy}></Route>
          <Route path="/cart" component={Cart}></Route>
          <Route path="/placeOrder" component={PlaceOrder}></Route>
          <Route path="/otpVerify" component={FormDialog}></Route>
        </Switch>
      </BrowserRouter>
      
  );

}

export default App;
