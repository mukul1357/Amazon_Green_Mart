import React, { useState } from "react";
import "../styles/Payment.css";
import CheckoutProduct from "./CheckoutProduct";
import * as utils from "../logic/utils";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CardElement } from "@stripe/react-stripe-js";
import { emptyCart, addOrder } from "../redux/actions";
import { v4 } from "uuid";
import moment, { min } from "moment";

function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const user = JSON.parse(localStorage.getItem("1"));

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const box = React.createRef();
  const original_price = utils.getTotalPrice(cart);
  var total = utils.getTotalPrice(cart);
  var points = parseInt(JSON.parse(localStorage.getItem("greenPoints")));
  // const [checkBox, setCheck] = useState(false);
  var checkBox = false;
  var coins_left = points;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!cart.length) {
      navigate('/orders', { replace: true });
      return;
    }
    // !error && setProcessing(true);
    setProcessing(true);

    const order = {
      order_id: v4(),
      amount: utils.formatter.format(utils.getTotalPrice(cart)),
      created: moment().format("MMMM Do YYYY, h:mma"),
      cart,
    };
    // dispatch(addOrder(order));

    setTimeout(() => {
      setProcessing("")
      setSucceeded(true)
      setDisabled(true)
      dispatch(emptyCart());
      var arr = [];
      var items = JSON.parse(localStorage.getItem("amazon_1"));
      order.amount = utils.formatter.format(total);
      arr.push(order);
      if (items) {
        for (let i = 0; i < items.length; i++)
          arr.push(items[i]);
      }
      // console.log(arr);
      localStorage.setItem("amazon_1", JSON.stringify(arr));
      localStorage.setItem("orderPlacedActive", JSON.stringify(true));
      localStorage.setItem("greenPoints", JSON.stringify(coins_left))
      navigate('/orders', { replace: true });
    }, 1000);
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const onCheckBoxClick = () => {
    total = original_price;
    if (!checkBox) {
      checkBox = true;
      var per = total / 5;   // 20% of total price
      var points_to_rs = Math.floor(points / 5);
      if (total < 2000) {
        per = Math.min(per, 500);
        total -= Math.min(per, points_to_rs);
      }
      else if (total >= 2000 && total < 40000) {
        per = Math.min(per, 800);
        total -= Math.min(per, points_to_rs);
      }
      else {
        per = Math.min(per, 5000);
        total -= Math.min(per, points_to_rs);
      }
      coins_left = points - 5*Math.min(per, points_to_rs);
    }
    else {
      checkBox = false;
      coins_left = points;
    }
    // console.log(total);
    let ele = document.getElementById("priceContain");
    ele.innerText = "Rs." + utils.formatter.format(total);
  }

  const onMouseEnter = (e) => {
    let ele = document.getElementById("popover-description");
    // ele.className = "absolute z-10 visible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
    ele.className = "visible inline-block text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-100 w-72 bg-gray-800 border-gray-600 text-gray-400 popover"
  };

  const onMouseLeave = (e) => {
    let ele = document.getElementById("popover-description");
    let ele1 = document.getElementById("box");
    var eleBounds = box.current.getBoundingClientRect();
    // console.log("e.clientX = ", e.clientX);
    // console.log("eleBounds Left = ", eleBounds.left-20);
    // console.log("eleBounds right = ", eleBounds.right);
    if (e.clientX >= eleBounds.left - 20 && e.clientX <= eleBounds.right) {
      ele.className = "visible inline-block text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-100 w-72 bg-gray-800 border-gray-600 text-gray-400 popover"
    } else {
      ele.className = "invisible inline-block text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-0 w-72 bg-gray-800 border-gray-600 text-gray-400 popover"
    }
  };

  return (
    <div className="payment" id="3">
      <div className="payment__container">
        <h1>Checkout {<Link to="/checkout">{!cart.length ? 'empty' : `${cart.length} ${cart.length === 1 ? 'item' : 'items'}`}</Link>}</h1>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user.email}</p>
            <p>Kasturba Rd, behind High Court</p>
            <p>Bengaluru, Karnataka (560001)</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment__items">
            {cart?.map((item, index) => (
              <CheckoutProduct
                id={item.id}
                cartId={index}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              {/* <div className="checkout__productGift">
                <p>Cash on Delivery</p>
                <input type="checkbox" name="gift" /> */}

              <div class="flex mb-4" style={{ flexDirection: "column" }}>
                <p>Cash on Delivery</p>
                <div style={{ display: "flex", height: "258px" }}>
                  <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 checkbox" onClick={onCheckBoxClick} />
                  {/* <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label> */}
                  {/* </div> */}

                  <p class="flex items-center text-sm text-blue-600 titlePara" style={{ marginLeft: "5px" }}>Use Green Points <button data-popover-target="popover-description" data-popover-placement="bottom-end" type="button" onMouseEnter={e => onMouseEnter(e)} onMouseLeave={e => onMouseLeave(e)} className="buttonInfo"><svg class="w-4 h-4 ml-2 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg><span class="sr-only">Show information</span></button>

                    <div data-popover id="popover-description" role="tooltip" class="invisible inline-block text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-0 w-72 bg-gray-800 border-gray-600 text-gray-400 popover">
                      <div class="p-3 space-y-2" style={{ marginLeft: "7px" }}>
                        <div id="box" ref={box}>
                          <h3 class="font-semibold text-white title">Discount via using Green Points</h3></div>
                        <ul>
                          <li className="li_payment"><h5>20% off upto Rs.500 for price less than Rs.2000</h5></li>
                          <li className="li_payment"><h5>20% off upto Rs.800 for price greater than or equal to Rs.2000 and less than Rs.40,000</h5></li>
                          <li className="li_payment"><h4>20% off upto Rs.5000 for price greater than or equal to Rs.40,000</h4></li>
                        </ul>
                        {/* <h3 class="font-semibold text-white">Calculation</h3>
                  <p>For each date bucket, the all-time volume of activities is calculated. This means that activities in period n contain all activities up to period n, plus the activities generated by your community in period.</p> */}
                        <div class="font-mediu"><p className="font-medium text-white underline">Note: </p><div>
                          <h6>1 Rs = 5 coins, and discount will be application according to the number of Green Points you have.</h6>
                        </div>
                        </div>
                      </div>
                      {/* <div data-popper-arrow="" className="arrow" style={{position: "absolute"}}></div> */}
                    </div></p>

                </div>
              </div>

              {/* <CardElement onChange={handleChange} /> */}

              <div className="payment__priceContainer">
                <div>
                  Order Total :&nbsp;
                  <strong id="priceContain">
                    Rs.
                    {utils.formatter.format(total)}
                  </strong>
                </div>
                {/* <button disabled={processing || disabled || succeeded}> */}
                <button type="submit" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900" disabled={false} style={{ width: "14%" }}>
                  <p>{processing ? "Processing" : "Buy Now"}</p>
                </button>
              </div>

              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
