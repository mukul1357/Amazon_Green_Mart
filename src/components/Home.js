import React, { useEffect, useState } from "react";
import background from "../images/amazon.jpg";
import background2 from "../images/home-bg-2.jpg";
import "../styles/Home.css";
import Product from "./Product";

// Images
import iphone from "../images/product-iphone13.png";
import samsungs21 from "../images/product-samsungs21.png";
import amazonecho from "../images/product-amazonecho.png";
import ipadpro from "../images/product-ipadpro.png";
import applewatch from "../images/product-applewatch.png";
import samsungtv from "../images/product-samsungtv.png";
import { useSelector } from "react-redux";

function Home(props) {
  const cart = useSelector((state) => state.cart);
  const [alert, setAlert] = useState(null);
  const [timeOutID, setTimeOutID] = useState(null);
  const elements = [];

  localStorage.setItem("orderPlacedActive", JSON.stringify(false));

  if (props.prodAdded) {
    // console.log(props.prediction)
    var url;
    if (props.category === "CT") {
      url = `/Clothes/${props.image}` + `.jpg`;
    }
    else
      url = `/Appliances/${props.image}` + `.jpg`
    elements.push(<Product
      key={props.ID}
      id={props.ID}
      image={url}
      title={props.name}
      price={props.price}
      rating={4.5}
      green={props.prediction}
    />)
    props.setProdAdded(false);
    const arr = []
    const ids = []
    const prod = JSON.parse(localStorage.getItem("products"));
    if (prod === null) {
      arr.push(elements[0]["props"]);
      localStorage.setItem("products", JSON.stringify(arr));
      ids.push(props.ID);
      localStorage.setItem("id_list", JSON.stringify(ids));
    }
    else {
      var items = JSON.parse(localStorage.getItem("products"));
      for (let i = 0; i < items.length; i++) {
        arr.push(items[i]);
      }
      
      const id_list = []
      const ids = JSON.parse(localStorage.getItem("id_list"));
      for(let i=0;i<ids.length;i++)
        id_list.push(ids[i]);
      
      var id_copy = elements[0]["props"].id;
      if(!id_list.includes(id_copy)) {
        // console.log(elements[0]["props"]);
        arr.push(elements[0]["props"]);
        id_list.push(id_copy)
        localStorage.setItem("products", JSON.stringify(arr));
        localStorage.setItem("id_list", JSON.stringify(id_list));
      }
    }
  }
  else {
    try {
    const arr = JSON.parse(localStorage.getItem("products"));
    for (let i = 0; i < arr.length; i++) {
      elements.push(<Product
        key={arr[i].id}
        id={arr[i].id}
        image={arr[i].image}
        title={arr[i].title}
        price={arr[i].price}
        rating={4.5}
        green={arr[i].green}
      />)
    }
  } catch {
    ;
  }
  }

  useEffect(() => {
    if (cart.length) {
      setAlert("Item added to cart");

      if (timeOutID) clearTimeout(timeOutID);

      const TID = setTimeout(() => {
        setAlert(null);
      }, 1000);
      setTimeOutID(TID);
    }
  }, [cart]);

  useEffect(() => {
    if(props.prodAdded) {
      setAlert("Product has been Added!");
    if (timeOutID) clearTimeout(timeOutID);

    const TID = setTimeout(() => {
        setAlert(null);
    }, 5000);
    setTimeOutID(TID);
    }
  }, [props.prodAdded])



  return (
    <div className="home" id="1">
      <div className="home__container">
        <img src={props.mediaWidth > 840 ? background : background2} alt="home-background" className="home__image" />

        <div className="home__row" id="homeContainer">
          {/* <div class="grid gap-5 mb-5 md:grid-cols-2 h-10 flex-grow-0"> */}
          {/* <div class="grid gap-5 mb-5 md:auto-cols-fr h-10"> */}
          <Product
            id="537338"
            image={iphone}
            title="Apple iPhone 13, 128GB, Blue - Unlocked (Renewed)"
            price="50000"
            rating={4.5}
            green={4}
          />
          <Product
            key="537339"
            id="537339"
            image={samsungs21}
            title="Samsung Galaxy S21 5G, 128GB, Phantom Gray"
            price="30000"
            rating={4.5}
            green={4}
          />
          {/* </div> */}

          {/* <div className="home__row"> */}
          <Product
            key="537340"
            id="537340"
            image={amazonecho}
            title="Echo (4th generation) With Alexa"
            price="2000"
            rating={5}
            green={5}
          />
          <Product
            key="537341"
            id="537341"
            image={ipadpro}
            title="2021 Apple iPad Pro (Wi-Fi, 128GB) - Silver"
            price="1500"
            rating={5}
            green={3}
          />
          <Product
            key="537342"
            id="537342"
            image={applewatch}
            title="Apple Watch Series 3 - Silver Aluminum Case"
            price="1000"
            rating={4.5}
            green={2}
          />
          {/* </div> */}

          {/* <div className="home__row"> */}
          <Product
            key="537343"
            id="537343"
            image={samsungtv}
            title="SAMSUNG Odyssey 32-Inch WQHD (2560x1440) Gaming Monitor"
            price="15000"
            rating={3.5}
            green={3}
          />
          {elements}
        </div>
      </div>
      {props.mediaWidth > 840 && (
        <div
          className={
            alert !== null
              ? "home__alert active"
              : "home__alert"
          }
        >
          {alert}
        </div>
      )}
    </div>
  );
}

export default Home;
