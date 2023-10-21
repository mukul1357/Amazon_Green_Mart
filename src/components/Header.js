import React, { useState } from "react";
import "../styles/Header.css";
import logo from "../images/amazon-logo.png";
import AmericaFlag from "../images/india.png";
import shoppingCart from "../images/cart.png";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { MdPersonOutline } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { TbMenu2 } from "react-icons/tb";
import { useSelector } from "react-redux";
import { auth } from "../config/firebase";
import Dropdownmenu from "./Dropdownmenu";
import { stringify } from "@firebase/util";
import coinIcon from '../images/coinIcon.png';

function Header({ mediaWidth }) {
  const cart = useSelector((state) => state.cart);
  // const user = useSelector((state) => state.user);
  const user = JSON.parse(localStorage.getItem("1"));
  const navigate = useNavigate();

  const [mobileNav, setMobileNav] = useState(false);
  // const [isDropdownVisible, setDropdownVisible] = useState(false);

  // const handleMouseEnter = () => {
  //   for(var i=1;i<7;i++) {
  //     try {
  //     let ele = document.getElementById(i.toString()).style;
  //     ele.filter = 'blur(2px)';
  //     }
  //     catch {
  //       ;
  //     }
  //   }
  //   setDropdownVisible(true);
  // };

  // const handleMouseLeave = () => {
  //   for(var i=1;i<7;i++) {
  //     try {
  //     let ele = document.getElementById(i.toString()).style;
  //     ele.filter = '';
  //     }
  //     catch {
  //       ;
  //     }
  //   }
  //   setDropdownVisible(false);
  // };

  const handleAuthentication = () => {
    setMobileNav((prevState) => !prevState);
    if (mediaWidth <= 840) !user && navigate("/login");
    if (user) auth.signOut();
  };

  const getUserName = (email) => (email.split("@")[0]).split(".")[0];

  return (
    <div className="header">
      <div className="header__container">
        {/* Menu Toggle Open */}
        {mediaWidth <= 840 && (
          <TbMenu2
            className="header__toggleOpen"
            onClick={() => setMobileNav((prevState) => !prevState)}
          />
        )}

        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="amazon" className="header__logo" />
        </Link>

        {/* Search */}
        {mediaWidth > 840 && (
          <div className="header__search">
            <input type="text" className="header__searchInput" placeholder="Search Amazon" />
            <div className="header__searchIcon">
              <AiOutlineSearch />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="header__nav">
          {mediaWidth > 840 && (
            <div className="header__option" style={{flexDirection: "row-reverse"}}>
              <span className="header__optionOne" style={{fontWeight: "bold", position: "relative", top: "0.1em"}}>EN</span>
              <span className="header__optionTwo header__optionImg">
                <img src={AmericaFlag} alt="English" />
              </span>
            </div>
          )}

          {mediaWidth > 840 && (
            <Link to={!user && "/login"}>
              <div className="header__option">
                <span className="header__optionOne">
                  Hello, {user ? getUserName(user.email) : "sign in"}
                  {/* Hello, Manas */}
                </span>
                <span className="header__optionTwo">
                  {/* {user ? "Sign Out" : "Sign In"} */}
                  Account & Lists
                </span>
              </div>
            </Link>
          )}

          {mediaWidth > 840 && (
            <Link to="/orders">
              <div className="header__option">
                <span className="header__optionOne">Returns</span>
                <span className="header__optionTwo">& Orders</span>
              </div>
            </Link>
          )}

          {/* {mediaWidth > 840 && (
            <div
            className="header__option"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="loyalty">Loyalty Points</span>
            {isDropdownVisible && <Dropdownmenu />}
            </div>
          )} */}

          {mediaWidth <= 840 && (
            <div className="header__mobileUser" onClick={() => !user && navigate('/login')}>
              <MdPersonOutline className="header__mobileUserIcon" />
              <span className="header__mobileUserName">
                {user ? getUserName(user.email) : "Guest"}
              </span>
            </div>
          )}

          <Link to="/checkout">
            <div className="header__optionBasket">
              <div>
                <div className="header__optionBasketCount">{cart.length}</div>
                <img
                  src={shoppingCart}
                  alt="shopping cart"
                  className="header__basket"
                />
              </div>
              {mediaWidth > 840 && <span>Cart</span>}
            </div>
          </Link>
          {mediaWidth > 840 && user && (
              <div className="header__option1" id="coinIcon">
                <img src={coinIcon} alt=""/>
                {mediaWidth > 840 && <span className="points" style={{fontWeight: "bold"}}>1200</span>}
              </div>
            )}
        </nav>
      </div>
      <div className="header__mobileContainer">
        {mediaWidth <= 840 && (
          <div className="header__search">
            <input type="text" className="header__searchInput" />
            <div className="header__searchIcon">
              <AiOutlineSearch />
            </div>
          </div>
        )}
      </div>
      {mediaWidth <= 840 && (
        <div
          className={
            mobileNav ? "header__mobileNav active" : "header__mobileNav"
          }
        >
          <div
            className={
              mobileNav
                ? "header__mobileNavContainer active"
                : "header__mobileNavContainer"
            }
          >
            <div className="header__mobileNavHeader">
              <div className="header__mobileNavUser">
                <span>{user ? user.email : "Guest"}</span>
                <MdPersonOutline />
              </div>
              <p>
                <span>Browse</span>
                <br />
                Amazon Clone
              </p>
            </div>

            <ul className="header__mobileNavItems">
              <li className="header__option header__mobileNavItem">
                <span className="header__optionOne">English</span>
                <span className="header__optionTwo header__optionImg">
                  <img src={AmericaFlag} alt="" />
                </span>
              </li>

              <li
                className="header__option header__mobileNavItem"
                onClick={() => {
                  navigate("/orders");
                  setMobileNav((prevState) => !prevState);
                }}
              >
                <span className="header__optionOne">Returns</span>
                <span className="header__optionTwo">& Orders</span>
              </li>

              <li
                className="header__option header__mobileNavItem"
                onClick={handleAuthentication}
              >
                <span className="header__optionOne">
                  Hello, {user ? getUserName(user.email) : "sign in"}
                </span>
                <span className="header__optionTwo">
                  {user ? "Sign Out" : "Sign In"}
                </span>
              </li>
            </ul>
          </div>
          <div
            className={
              mobileNav ? "header__toggleClose active" : "header__toggleClose"
            }
            onClick={() => setMobileNav((prevState) => !prevState)}
          >
            <CgClose />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
