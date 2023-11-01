import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { auth } from "../config/firebase";
import { setUser } from "../redux/actions";
import Payment from "./Payment";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";
import SignUp from "./SignUp";
import Sell from "./Sell";
import Sell2 from "./Sell2";
import Sell3 from "./Sell3";
import React from 'react';
import Inventory from "./Inventory";

const promise = loadStripe(
  "pk_test_51LKikxJIr5sMtV8TVVCP3FSBVbFYb87a2Al30jAkasBgTDe61U02aRDd5ZJKT68wknB9Woa8ZNReOfSBs1Q3Ip6g00TdXWcbbN"
);

function App() {
  // const dispatch = useDispatch();

  // Detect size of screen
  const [mediaWidth, setMediaWidth] = useState(window.innerWidth);
  const [user, setUser] = useState(null);
  const [category, setCategory] = useState("Select a Category");
  const [subcategory, setSubCategory] = useState("Select a Sub-Category");
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [ID, setID] = useState(1);
  const [prodAdded, setProdAdded] = useState(false);
  const [prediction, setPrediction] = useState(0);
  const [seller_id, setSellerID] = useState(1);
  const [greenScheme, setGreenScheme] = useState(false);
  const [seller_name, setSellerName] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [slab, setSlab] = useState(0);
  window.addEventListener("resize", (event) =>
    setMediaWidth(window.innerWidth)
  );
  localStorage.setItem("orderPlacedActive", JSON.stringify(false));

  const points = JSON.parse(localStorage.getItem("greenPoints"));
  if(points === null)
    localStorage.setItem("greenPoints", JSON.stringify(0));

  const addGS = (array, id, name) => {
    var add = {
      seller_id: id,
      seller_name: name,
      amount: 0,
      vgp: 0
    }
    array.push(add);
    return array;
  }

  const greenSchemeActive = JSON.parse(localStorage.getItem("greenScheme"));
  var array = []
  if(greenSchemeActive === null) {
    array = addGS(array, "10", "Apple");
    array = addGS(array, "12", "Amazon");
    array = addGS(array, "14", "Allied Stores");
    localStorage.setItem("greenScheme", JSON.stringify(array));
  }

  // useEffect(() => {
  //   auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       // The user logged in / was logged in
  //       dispatch(setUser(authUser));
  //     } else {
  //       // The user logged out
  //       dispatch(setUser(null));
  //     }
  //   });
  // });
  return (
    <Router>
      <div className="App">
      <Header mediaWidth={mediaWidth} user={user} setUser={setUser}/>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* <Header mediaWidth={mediaWidth} user={user} setUser={setUser}/> */}
                <Home slab={slab} discount={discount} seller_name={seller_name} seller_id={seller_id} greenScheme={greenScheme} prediction={prediction} mediaWidth={mediaWidth} user={user} setUser={setUser} category={category} name={name} price={price} image={image} ID={ID} prodAdded={prodAdded} setProdAdded={setProdAdded}/>
              </>
            }
          />
          <Route
            path="/orders"
            element={
              <>
                {/* <Header mediaWidth={mediaWidth} user={user} setUser={setUser}/> */}
                <Orders user={user} setUser={setUser}/>
              </>
            }
          />
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/signup" element={<SignUp user={user} setUser={setUser} />} />
          <Route
            path="/checkout"
            element={
              <>
                {/* <Header mediaWidth={mediaWidth} user={user} setUser={setUser}/> */}
                <Checkout user={user} setUser={setUser} />
              </>
            }
          />
          <Route
            path="/payment"
            element={
              <>
                {/* <Header mediaWidth={mediaWidth} user={user} setUser={setUser}/> */}
                <Elements stripe={promise}>
                  <Payment user={user} setUser={setUser} />
                </Elements>
              </>
            }
          />
          <Route
            path="/sell"
            element={
              <>
                {/* <Header mediaWidth={mediaWidth} user={user} setUser={setUser}/> */}
                <Sell setSellerName={setSellerName} setSellerID={setSellerID} setID={setID} category={category} setCategory={setCategory} subcategory={subcategory} setSubCategory={setSubCategory} name={name} setName={setName}/>
              </>
            }
          />
          <Route path="/sellCloth" element={
          <>
          {/* <Header mediaWidth={mediaWidth} user={user} setUser={setUser}/> */}
          <Sell2 setSlab={setSlab} setDiscount={setDiscount} seller_id={seller_id} seller_name={seller_name} setGreenScheme={setGreenScheme} setPrediction={setPrediction} setProdAdded={setProdAdded} category={category} setCategory={setCategory} subcategory={subcategory} setSubCategory={setSubCategory} name={name} setName={setName} price={price} setPrice={setPrice} image={image} setImage={setImage}/>
          </>}
          />
          <Route path="/sellAppliance" element={
          <>
          {/* <Header mediaWidth={mediaWidth} user={user} setUser={setUser}/> */}
          <Sell3 setSlab={setSlab} setDiscount={setDiscount} seller_id={seller_id} seller_name={seller_name} setGreenScheme={setGreenScheme} setPrediction={setPrediction} setProdAdded={setProdAdded} category={category} setCategory={setCategory} subcategory={subcategory} setSubCategory={setSubCategory} name={name} setName={setName} price={price} setPrice={setPrice} image={image} setImage={setImage}/>
          </>}
          />
          <Route path="/inventoryManagement" element={
          <>
          {/* <Header mediaWidth={mediaWidth} user={user} setUser={setUser}/> */}
          <Inventory />
          </>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default React.memo(App);
