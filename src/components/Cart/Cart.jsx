import React from "react";
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
 // Paper,
  Typography,
} from "@mui/material";

import book from "../../assets/icons/Group 5.svg";
import Card from "@mui/material/Card";
import CartService from "../../services/CartService";
import { useState, useEffect } from "react";
import "./Cart.css";
import OrderService from "../../services/OrderService";

function Cart(props) {
  const [cartDetails, setCartDetails] = useState([]);

  useEffect(() => {
    fetchCartDetails();
  });

  const fetchCartDetails = () => {
    CartService.getCartDetails()
      .then((response) => {
        setCartDetails(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openHome = () => {
    props.history.push({
      pathname: "/home",
    });
  };

  const removeItemFromCart = (cartId) => {
    CartService.deleteCartItem(cartId).then((response) => {});
  };

  const placeOrderHandler = () => {
    props.history.push({ pathname: "/placeOrder" });
  };

  const updateQuantity = (e, cartId) => {
    let quantity = e.target.value;
    CartService.updateCartQuantity(cartId, quantity);
  };

  const checkoutHandler = (cartItem) => {
    let orderItem = {
      address: "Mg Road",
      bookId: cartItem.bookDetailsModel.bookId,
      cancel: false,
      price: cartItem.quantity * cartItem.bookDetailsModel.bookPrice,
      quantity: cartItem.quantity,
      userId: cartItem.bookDetailsModel.userId,
    };

    OrderService.placeOrder(orderItem)
      .then((response) => {
        alert(response.data.message);
        removeItemFromCart(cartItem.cartId)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <header className="header">
        {/* <div className="logo-content-home"> */}
        <div className="header__logo__content">
          <img
            src={book}
            alt="logo-content"
            className="logo-content-img"
            width=""
          />
          <div className="logo-content-home-buttons">
            <Button
              sx={{ mr: "10px", ml: "10px" }}
              variant="contained"
              onClick={openHome}
            >
              {" "}
              Home{" "}
            </Button>
          </div>
        </div>
      </header>
      <div>
        <h1>Cart Details</h1>
        <Typography>Cart Count:{cartDetails.length}</Typography>
      </div>

      <div className="cart__card">
        {cartDetails.map((cartItem, i) => {
          return (
            <div key={i}>
              <div className="">
                <Card
                  sx={{
                    maxWidth: 200,
                    marginBottom: "20px",
                    marginRight: "20px",
                  }}
                >
                  <div style={{ width: "8rem", margin: "0 auto" }}>
                    <CardMedia
                      component="img"
                      height="140"
                      width="1"
                      image={cartItem.bookDetailsModel.imageURL}
                      alt="green iguana"
                    />
                  </div>
                  <CardContent>
                    <div>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ height: "40px" }}
                      >
                        {cartItem.bookDetailsModel.bookName}
                      </Typography>
                    </div>
                  </CardContent>
                  <div className="cart_quantity">
                    <label htmlFor="#">Quantity: </label>
                    <input
                      className="quantity_text"
                      type="number"
                      defaultValue={cartItem.quantity}
                      onChange={(e) => updateQuantity(e, cartItem.cartId)}
                    />
                  </div>
                  <div className="cart_price">
                    <label htmlFor="#">
                      ₹{cartItem.bookDetailsModel.bookPrice * cartItem.quantity}{" "}
                    </label>
                  </div>
                  <div>
                    <CardActions>
                      <Button
                        onClick={() => removeItemFromCart(cartItem.cartId)}
                        variant="contained"
                        size="small"
                      >
                        Remove
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => checkoutHandler(cartItem)}
                      >
                        Checkout
                      </Button>
                    </CardActions>
                  </div>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
      <div className="place__order">
        {cartDetails.length !== 0 && (
          <Button onClick={placeOrderHandler} variant="contained">
            PLACE ORDER
          </Button>
        )}
      </div>
    </div>
  );
}

export default Cart;
