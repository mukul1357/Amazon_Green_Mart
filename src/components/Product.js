import React from "react";
import "../styles/Product.css";
import * as utils from "../logic/utils";
import greenIcon from "../images/greenIcon.png";
import gsIcon from "../images/gsIcon.png";
import sellerIcon from "../images/sellerIcon.png";
import Star from "./Star";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";
import Green from "./Green";
import GreenIcon from "./GreenIcon";

function Product({ id, seller_id, image, title, price, rating, green, seller_name, isGS, discount, slab }) {
  const dispatch = useDispatch();

  const handleAddClick = () => {
    const item = {
      id,
      seller_id,
      title,
      image,
      price,
      rating,
      green,
      seller_name,
      isGS,
      discount,
      slab
    };
    dispatch(addToCart(item));
  };

  return (
    <div className="product flex-fill" id="4">
      <div className="product__img">
      {isGS && green > 3 ? <img src={gsIcon} alt="gs" className="gsIcon" style={{marginLeft: "0", marginRight: "0"}}/> : undefined}
        <img src={image} alt='' style={green <= 3 ? {left: "0rem"} : isGS ? {left: "0rem"} : {left: "3.6rem"}}/>
        {green > 3 ? <GreenIcon/> : undefined}
      </div>
      <div className="product__info">
        <p className="product__title">{title}</p>
        <div className="greenContainer">
        <div className="product__rating">
          {utils.renderRating(rating * 2).map((val, index) => (
            <Star key={index} text={val} />
          ))}
        </div>
        <Green green={green}/>
        </div>
        <div className="flex" style={{justifyContent: "space-between", marginTop: "1rem"}}>
        <p className="product__price">
          <span>Rs.</span>
          <span>{utils.formatter.format(utils.getPrice(price.toString()))}</span>
          <span>{utils.getPrice(price.toString(), "decimal")}</span>
        </p>
        <div className="flex">
          <img src={sellerIcon} alt="seller" className="sellerIcon"/>
        <span><b>{seller_name}</b></span></div>
        </div>
      </div>
      <button type="button" onClick={handleAddClick}>
        Add to cart
      </button>
    </div>
  );
}

export default Product;
