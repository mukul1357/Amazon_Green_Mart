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

const promise = loadStripe(
  "pk_test_51LKikxJIr5sMtV8TVVCP3FSBVbFYb87a2Al30jAkasBgTDe61U02aRDd5ZJKT68wknB9Woa8ZNReOfSBs1Q3Ip6g00TdXWcbbN"
);

function App() {
  const dispatch = useDispatch();

  // Detect size of screen
  const [mediaWidth, setMediaWidth] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => setMediaWidth(window.innerWidth), []);
  window.addEventListener("resize", (event) =>
    setMediaWidth(event.target.innerWidth)
  );
  localStorage.setItem("orderPlacedActive", JSON.stringify(false));

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // The user logged in / was logged in
        dispatch(setUser(authUser));
      } else {
        // The user logged out
        dispatch(setUser(null));
      }
    });
  });
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header mediaWidth={mediaWidth} user={user} setUser={setUser}/>
                <Home mediaWidth={mediaWidth} user={user} setUser={setUser}/>
              </>
            }
          />
          <Route
            path="/orders"
            element={
              <>
                <Header mediaWidth={mediaWidth} user={user} setUser={setUser}/>
                <Orders  user={user} setUser={setUser}/>
              </>
            }
          />
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/signup" element={<SignUp user={user} setUser={setUser} />} />
          <Route
            path="/checkout"
            element={
              <>
                <Header mediaWidth={mediaWidth} user={user} setUser={setUser}/>
                <Checkout user={user} setUser={setUser} />
              </>
            }
          />
          <Route
            path="/payment"
            element={
              <>
                <Header mediaWidth={mediaWidth} user={user} setUser={setUser}/>
                <Elements stripe={promise}>
                  <Payment user={user} setUser={setUser} />
                </Elements>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
