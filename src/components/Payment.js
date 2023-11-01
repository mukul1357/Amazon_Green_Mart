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
  const [checker, setChecker] = useState(false);
  var checkBox = false;
  var coins_left = points;
  const loyalty_points = [];
  const final_points = [];

  const arr = [];
  cart?.map((item, index) => {
    var item1 = {
      id: item.id,
      seller_id: item.seller_id,
      price: item.price,
      green: item.green,
      isGS: item.isGS,
      discount: item.discount,
      slab: item.slab
    }
    arr.push(item1);
  });
  const vgp_get = (arr[0].slab)*0.8;    // Max vgp that will get
  const cgp_get = (arr[0].slab)*0.2;    // Max cgp that will get

  const discount_available = [0, 0]

  const greenScheme = JSON.parse(localStorage.getItem("greenScheme"));
  greenScheme.forEach((item) => {
    if(parseInt(item.seller_id) === parseInt(arr[0].seller_id)) {
      discount_available[0] = parseFloat(item.vgp);
    }
  })
  discount_available[1] = parseInt(JSON.parse(localStorage.getItem("greenPoints")));

  const final_vgp = discount_available[0] - Math.min(discount_available[0], arr[0].discount) + vgp_get;
  const final_cgp = discount_available[1] - Math.min(discount_available[1], 0.7*(arr[0].discount)) + cgp_get;

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
      var arr1 = [];
      var items = JSON.parse(localStorage.getItem("amazon_1"));
      order.amount = utils.formatter.format(total);
      arr1.push(order);
      if (items) {
        for (let i = 0; i < items.length; i++)
          arr1.push(items[i]);
      }

      cart.forEach((item) => {
        if(item.green > 3 && item.isGS) {
          loyalty_points[0] = vgp_get;
          loyalty_points[1] = cgp_get;
        }
      });
      // console.log("points: ", loyalty_points);
      // console.log(arr);
      localStorage.setItem("amazon_1", JSON.stringify(arr1));
      localStorage.setItem("orderPlacedActive", JSON.stringify(true));
      const greenScheme = JSON.parse(localStorage.getItem("greenScheme"));
      if(checker) {
        if(final_points[0] === "VGP") {
          greenScheme.forEach((item) => {
            if(parseInt(item.seller_id) === parseInt(arr[0].seller_id)) {
              item.vgp = final_vgp;
            }
          })
          localStorage.setItem("greenScheme", JSON.stringify(greenScheme));
          localStorage.setItem("greenPoints", JSON.stringify(discount_available[1] + cgp_get));
        }
        else if(final_points[0] === "CGP") {
          localStorage.setItem("greenPoints", JSON.stringify(final_cgp));
          greenScheme.forEach((item) => {
            if(parseInt(item.seller_id) === parseInt(arr[0].seller_id)) {
              item.vgp += vgp_get;
            }
          })
          localStorage.setItem("greenScheme", JSON.stringify(greenScheme));
        }
        else {
          localStorage.setItem("greenPoints", JSON.stringify(discount_available[1] + cgp_get));
          greenScheme.forEach((item) => {
            if(parseInt(item.seller_id) === parseInt(arr[0].seller_id)) {
              item.vgp += vgp_get;
            }
          })
          localStorage.setItem("greenScheme", JSON.stringify(greenScheme));
        }
      }
      else {
        localStorage.setItem("greenPoints", JSON.stringify(discount_available[1] + cgp_get));
          greenScheme.forEach((item) => {
            if(parseInt(item.seller_id) === parseInt(arr[0].seller_id)) {
              item.vgp += vgp_get;
              console.log(item.vgp);
              console.log(greenScheme[0].vgp, greenScheme[0].seller_name)
            }
          })
          console.log(greenScheme);
        localStorage.setItem("greenScheme", JSON.stringify(greenScheme));
      }
      localStorage.setItem("loyaltyPoints", JSON.stringify(loyalty_points))   //Represents VGP and CGP added
      
      dispatch(emptyCart());
      navigate('/orders', { replace: true });
    }, 1000);
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleChange1 = (e) => {
    const val = e.target.value;
    if (val === "VGP") {
      total = original_price - Math.min(discount_available[0], arr[0].discount);
      final_points.push("VGP")
    }
    else if(val === "CGP") {
      total = original_price - Math.min(discount_available[1], 0.7*(arr[0].discount));
      final_points.push("CGP")
    }
    else {
      total = original_price;
    }
    let ele = document.getElementById("priceContain");
    ele.innerText = "Rs." + utils.formatter.format(total);
  };

  const onCheckBoxClick = (e) => {
    total = original_price;
    if (!checker) {
      setChecker(true);
    }
    else {
      // checkBox = false;
      setChecker(false);
      coins_left = points;
    }
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
            {cart?.map((item, index) =>
              // var item1 = {
              //   id: item.id,
              //   seller_id: item.seller_id,
              //   price: item.price,
              //   green: item.green,
              //   isGS: item.isGS
              // }
              // arr.push(item1);
              (
              <CheckoutProduct
                id={item.id}
                seller_id={item.seller_id}
                cartId={index}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                green={item.green}
                seller_name={item.seller_name}
                isGS={item.isGS}
                discount={item.discount}
                slab={item.slab}
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
                  <input id="checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 checkbox" onClick={(e) => {onCheckBoxClick(e)}} />
                  <p class="flex items-center text-sm text-blue-600 titlePara" style={{ marginLeft: "5px" }}>Use Green Points <button data-popover-target="popover-description" data-popover-placement="bottom-end" type="button" onMouseEnter={e => onMouseEnter(e)} onMouseLeave={e => onMouseLeave(e)} className="buttonInfo"><svg class="w-4 h-4 ml-2 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg><span class="sr-only">Show information</span></button>

                    <div data-popover id="popover-description" role="tooltip" class="invisible inline-block text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-0 w-72 bg-gray-800 border-gray-600 text-gray-400 popover">
                      <div class="p-3 space-y-2" style={{ marginLeft: "7px" }}>
                        <div id="box" ref={box}>
                          <h3 class="font-semibold text-white title">Rewards after purchase</h3></div>
                        <ul>
                          <li className="li_payment"><h5>Vendor Green Points: {vgp_get}</h5></li>
                          <li className="li_payment"><h5>Common Green Points: {cgp_get}</h5></li>
                        </ul>

                        <h3 class="font-semibold text-white title">Discount for the current product</h3>
                        <ul>
                          <li className="li_payment"><h5>Vendor Green Points: {Math.min(discount_available[0], arr[0].discount)}</h5></li>
                          <li className="li_payment"><h5>Common Green Points: {Math.min(discount_available[1], 0.7*(arr[0].discount))}</h5></li>
                        </ul>

                        <div class="font-medium"><p className="font-medium text-white underline">Note: </p><div>
                          <h6>1 Rs = 1 point, and discount will be application according to the number of Green Points you have.</h6>
                        </div>
                        </div>
                      </div>
                      {/* <div data-popper-arrow="" className="arrow" style={{position: "absolute"}}></div> */}
                    </div></p>

                </div>

                {checker ? (<div className="flex mb-1 text-sm mt-5 offerBox" style={{maxWidth: "9.6rem"}}>
        <label
          for="offers"
          class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Offers
        </label>
      <select
        id="offers"
        onChange={(e) => handleChange1(e)}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected>Select an Offer</option>
        {discount_available[0] > 0 ? <option value="VGP">Vendor Green Points</option> : undefined}
        {discount_available[1] > 0 ? <option value="CGP">Common Green Points</option> : undefined}
      </select>
      </div>) : undefined}

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
