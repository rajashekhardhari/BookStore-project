import React from "react";
import book1 from "../../../assets/images/bookimages/Image 11.png";
// import book2 from "../../../assets/images/bookimages/Image 18.png";
// import book3 from "../../../assets/images/bookimages/Image 22.png";
import "./Card.css";
import CartService from "../../../services/CartService";
import ratingImg from '../../../assets/icons/star.png'

export default function Card(props) {
  const cardHandler = (e) =>{
    const bookId = props.id;
    CartService.addBookToCart(bookId)
    .then((response)=>{
      console.log(response)
      alert(response.data.message)
    })
    .catch((error)=>{
      console.log(error)
      alert(error.response.data.message)
    })

  }

  


  return (
    <div key={props.id} className="bookCard">
      <div className="card__body">
        <div className="card__image__container">
          <img
            className="card__image"
            src={(props.image && props.image) || book1}
            alt=""
          />
        </div>
        <div className="card__title__author">
          <h2 className="card__title">{props.title}</h2>
          <span className="card__author">by {props.author}</span>
        </div>
        <span className="card__price">Rs.{props.price}</span>
        <span className="card__rating"> {props.rating} <img src={ratingImg} style={{width:"20px"}} alt="" /></span>
      </div>
      <div className="card__button">
        <button onClick={cardHandler} className="card__add_button">{props.button1}</button>
        <button className="card__wishlist_button">{props.button2}</button>
      </div>
    </div>
  );
}
