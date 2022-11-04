import React from "react";
//import { Link } from "react-router-dom";
import book from "../../../assets/icons/Group 5.svg";
import "./AddBook.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import BookService from "../../../services/BookService";
import DirectionSnackbar from "../../utils/SnackBar";
import { Paper } from "@mui/material";

export default function AddBook(props) {
  const [snackBar, setsnackBar] = useState({
    snackFlag: false,
    snackMessage: "",
    severity: "",
  });
  const [bookDetails, setBookDetails] = useState({
    authorName: "",
    bookName: "",
    bookPrice: 0,
    description: "",
    imageURL: "",
    publishingYear: 0,
    quantity: 0,
    rating: 1,
  });

  const addBookHandler = (e) => {
    e.preventDefault();
    let book = {
      authorName: bookDetails.authorName,
      bookName: bookDetails.bookName,
      bookPrice: bookDetails.bookPrice,
      description: bookDetails.description,
      imageURL: bookDetails.imageURL,
      publishingYear: bookDetails.publishingYear,
      quantity: bookDetails.quantity,
      rating: bookDetails.rating,
    };

    let token = localStorage.getItem("token");
    console.log(token);
    BookService.addBook(book)
    .then((response)=>{
      console.log(response)
      setsnackBar({
        ...snackBar,
        snackFlag: true,
        snackMessage: response.data.message,
        severity: "success",
      });
      alert(response.data.message)
      props.history.push({
        pathname:"/home"
      })
    })
    .catch((error)=>{
      console.log(error);
      setsnackBar({
        ...snackBar,
        snackFlag: true,
        snackMessage: error.response.data.message,
        severity: "error",
      });
      alert(error.response.data.message)
    });
  };

  const handleBookInput = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setBookDetails({
      ...bookDetails,
      [name]: value,
    });
    console.log(bookDetails);
  };

  const resetHandler = (e) => {
    e.preventDefault();
    setBookDetails({
      ...bookDetails,
      authorName: "",
      bookName: "",
      bookPrice: "",
      description: "",
      imageURL: "",
      publishingYear: "",
      quantity: "",
      rating: 1,
    });
  };

  return (
    <div className="container-addbook">
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
              className="login-link link"
              
              sx={{mr:"20px",ml:"10px"}}
              onClick={() => {
                props.history.push({
                  pathname: "/login",
                });
              }}
            >
              login
            </Button>
            <Button
              variant="contained"
              className="signUp-link link"
              
              onClick={() => {
                props.history.push({
                  pathname: "/signUp",
                });
              }}
            >
              signup
            </Button>
          </span>
        </div>
      </header>

      <div className="form-content">
        <Paper elevation={10}>
        <form
          action="#"
          className="form"
          onSubmit={addBookHandler}
          onReset={resetHandler}
        >
          <div className="form-head-content">
            <div className="form-head">BookStore AddBook</div>
          </div>
          <div className="row-content">
            <TextField
              className="input"
              label="BookName*"
              type="text"
              placeholder="bookName*"
              name="bookName"
              value={bookDetails.bookName}
              onChange={handleBookInput}
            />
            <TextField
              className="input"
              label="AuthorName*"
              type="text"
              placeholder="authorName*"
              name="authorName"
              value={bookDetails.authorName}
              onChange={handleBookInput}
            />
          </div>

          <div className="row-content">
            <TextField
              className="input"
              label="Description"
              multiline
              rows={4}
              name="description"
              placeholder="description"
              value={bookDetails.description}
              onChange={handleBookInput}
            />

            <div className="input">
              <Typography component="legend">Rating</Typography>
              <Rating
                name="rating"
                value={bookDetails.rating}
                onChange={handleBookInput}
              />
            </div>
          </div>

          <div className="row-content">
            <FormControl className="input">
              <InputLabel htmlFor="outlined-adornment-amount">
                Book Price
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                value={bookDetails.bookPrice}
                name="bookPrice"
                onChange={handleBookInput}
                startAdornment={
                  <InputAdornment position="start">₹</InputAdornment>
                }
                label="Book Price"
              />
            </FormControl>

            <TextField
              className="input"
              label="Quantity*"
              type="number"
              placeholder="Quantity*"
              name="quantity"
              value={bookDetails.quantity}
              onChange={handleBookInput}
            />
          </div>

          <div className="row-content">
            <TextField
              className="input"
              label="Publishing Year*"
              type="year"
              placeholder="Publishing Year*"
              name="publishingYear"
              value={bookDetails.publishingYear}
              onChange={handleBookInput}
            />

            <TextField
              className="input"
              label="ImageURL*"
              type="text"
              placeholder="ImageURL*"
              name="imageURL"
              value={bookDetails.imageURL}
              onChange={handleBookInput}
            />
          </div>
          <div className="row-content">
            <Button
              type="submit"
              className="submit-button button addButton"
              variant="contained"
              color="success"
            >
              AddBook
            </Button>
            <Button
              type="reset"
              className="reset-button button resetButton"
              variant="contained"
              color="success"
              sx={{mb:"20px"}}
            >
              Reset
            </Button>
          </div>
        </form>
        </Paper>
      </div>
      {snackBar.snackFlag && 
        <DirectionSnackbar message={snackBar.snackMessage} severity={snackBar.severity} flag={snackBar.snackFlag}  />
      }
    </div>
  );
}
