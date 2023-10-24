import React from "react";
import "../styles/Product.css";
import * as utils from "../logic/utils";
import greenIcon from "../images/greenIcon.png";
import Star from "./Star";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";
import Green from "./Green";
import GreenIcon from "./GreenIcon";

function Product({ id, image, title, price, rating, green }) {
  const dispatch = useDispatch();

  const handleAddClick = () => {
    const item = {
      id,
      title,
      image,
      price,
      rating,
      green,
    };
    dispatch(addToCart(item));
  };

  return (
    <div className="product flex-fill" id="4">
      <div className="product__img">
        <img src={image} alt='' style={green > 3 ? {left: "3.6rem"} : {left: "0rem"}}/>
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
        <p className="product__price">
          <span>Rs.</span>
          <span>{utils.formatter.format(utils.getPrice(price.toString()))}</span>
          <span>{utils.getPrice(price.toString(), "decimal")}</span>
        </p>
      </div>
      <button type="button" onClick={handleAddClick}>
        Add to cart
      </button>
    </div>
  );
}

export default Product;
