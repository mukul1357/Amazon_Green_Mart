import React, { useState } from "react";
import "../styles/CheckoutProduct.css";
import * as utils from "../logic/utils";
import { useDispatch } from "react-redux";
import Star from "./Star";
import sellerIcon from "../images/sellerIcon.png";
import gsIcon from "../images/gsIcon.png";
import vgpIcon from "../images/vgpIcon.png";
import { removeFromCart } from "../redux/actions";
import Green from "./Green";

function CheckoutProduct({ cartId, seller_id, image, title, price, rating, green, seller_name, isGS, discount, slab }) {
  const dispatch = useDispatch();
  const arr = [];
  var vgp = null;
  if(isGS && green > 3) {
    const greenScheme = JSON.parse(localStorage.getItem("greenScheme"));
    for(let i=0;i<greenScheme.length;i++) {
      if(parseInt(greenScheme[i].seller_id) === parseInt(seller_id)) {
        arr.push(greenScheme[i].vgp)
        break;
      }
    }
  }


  const handleRemoveClick = () => {
    dispatch(removeFromCart(cartId));
  }

  return (
    <div className="checkout__product" id="6">
      {isGS && green > 3 ? <img src={gsIcon} alt="gs" className="gsIcon" style={{position: "absolute", maxWidth: "2rem"}}/> : undefined}
      <div className="checkout__productImg">
        <img src={image} alt=''/>
      </div>

      <div className="checkout__productInfo">
        <div className="checkout__productTitlePrice">
          <div className="checkout__productTitle">{title}</div>
          <div className="checkout__productPrice">Rs.{utils.formatter.format(price)}</div>
        </div>

        
        
        <div className="greenContainer">
        <div className="checkout__productRating">
          {utils.renderRating(rating * 2).map((val, index) => (
            <Star key={index} text={val} />
          ))}
        </div>
        <Green green={green}/>
        </div>

        <div className="checkout__productGift">
          <input type="checkbox" name="gift" />
          <span>This is a gift</span>
          <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ord_cart_shr?pop-up=1&nodeId=200507630" target="_blank" rel="noreferrer" style={{color: "blue", textDecoration: "underline"}}>
            Learn More
          </a>
        </div>

        <div className="flex" style={{justifyContent: "space-between"}}>
        <div className="checkout__productButtons">
          <button type="button" onClick={handleRemoveClick}>Delete</button>
          <button type="button">Save for later</button>
        </div>
        <div className="flex">
            <img src={sellerIcon} alt="seller" className="sellerIcon"/>
            <span><b>{seller_name}</b></span>
        </div>
        </div>
        
        {green > 3 && isGS ? (<div className="flex">
          <div className="flex" style={{flexDirection: "column"}}>
          <img src={vgpIcon} alt="vgp" className="vgpIcon" style={{maxWidth: "2.8rem", marginRight: "0.5rem"}}/>
          <span className="header__optionTwo" style={{marginLeft: "0.4rem", fontSize: "x-small"}}>VGP</span>
          </div>
          <span style={{position: "relative", top: "0.6rem"}}><b>{arr.length ? arr[0] : 0}</b></span>
        </div>) : undefined}
      </div>
    </div>
  );
}

export default CheckoutProduct;
