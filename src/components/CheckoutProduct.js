import React from "react";
import "../styles/CheckoutProduct.css";
import * as utils from "../logic/utils";
import { useDispatch } from "react-redux";
import Star from "./Star";
import { removeFromCart } from "../redux/actions";

function CheckoutProduct({ cartId, image, title, price, rating }) {
  const dispatch = useDispatch();

  const handleRemoveClick = () => {
    dispatch(removeFromCart(cartId));
  }

  return (
    <div className="checkout__product" id="6">
      <div className="checkout__productImg">
        <img src={image} alt=''/>
      </div>

      <div className="checkout__productInfo">
        <div className="checkout__productTitlePrice">
          <div className="checkout__productTitle">{title}</div>
          <div className="checkout__productPrice">Rs.{utils.formatter.format(price)}</div>
        </div>

        <div className="checkout__productGift">
          <input type="checkbox" name="gift" />
          <span>This is a gift</span>
          <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ord_cart_shr?pop-up=1&nodeId=200507630" target="_blank" rel="noreferrer">
            Learn More
          </a>
        </div>

        <div className="checkout__productRating">
          {utils.renderRating(rating * 2).map((val, index) => (
            <Star key={index} text={val} />
          ))}
        </div>

        <div className="checkout__productButtons">
          <button type="button" onClick={handleRemoveClick}>Delete</button>
          <button type="button">Save for later</button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutProduct;