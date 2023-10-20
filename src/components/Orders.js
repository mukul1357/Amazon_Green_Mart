import React, { useEffect, useState } from "react";
import "../styles/Orders.css";
import "../styles/Home.css";
import { useDispatch, useSelector } from "react-redux";
import Order from "./Order";
import { deleteUserOrders, setUser, updateUserOrders } from "../redux/actions";
import Confetti from "react-confetti";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [alert, setAlert] = useState(true);
  const user = JSON.parse(localStorage.getItem("1"));
  const flag = JSON.parse(localStorage.getItem("orderPlacedActive"));  

  var extStoreOrders =
    JSON.parse(localStorage.getItem(`amazon_${user.uid}`)) || [];

    {setTimeout(() => {
      setAlert(false);
    }, 4000)};

  return (
    <>
    {alert && flag ? <div
          className={
            alert === true
              ? "home__alert active"
              : "home__alert"
          }
        >
          {"Loyalty Points have been added to your Account!"}
        </div> : undefined}
    <div className="orders">
      {flag && <div><p className="greenery">Congratulations! You have contributed to the Environment.</p></div>}
      <h1>Your Orders</h1>
    {flag && <Confetti
    width={window.innerWidth}
  height={window.innerHeight}/>}



      <div className="orders__order">
        {!user && "Sign In to see your orders"}
        {user && !extStoreOrders.length && "Currently no orders"}
        {extStoreOrders?.map((order) => (
          <Order order={order} key={order.id} />
        ))}
      </div>
    </div>
    </>
  );
}

export default Orders;
