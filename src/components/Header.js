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
import { stringify } from "@firebase/util";
import coinIcon from "../images/coinIcon.png";
import inventory from "../images/warehouse.png"

function Header({ mediaWidth }) {
  const cart = useSelector((state) => state.cart);
  // const user = useSelector((state) => state.user);
  const user = JSON.parse(localStorage.getItem("1"));
  var greenPoints = JSON.parse(localStorage.getItem("greenPoints"));
  const navigate = useNavigate();
  // console.log("Hello");

  const [mobileNav, setMobileNav] = useState(false);

  const handleAuthentication = () => {
    setMobileNav((prevState) => !prevState);
    if (mediaWidth <= 840) !user && navigate("/login");
    if (user) auth.signOut();
  };

  const getUserName = (email) => email.split("@")[0].split(".")[0];

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
          <div class="flex header__search">
            <div class="relative w-full">
              <input
                type="text"
                id="search-dropdown"
                class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 header__searchInput"
                placeholder="Search Amazon"
              />
              <div className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full rounded-r-lg border focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 header__searchIcon header__searchIcon">
                <AiOutlineSearch />
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="header__nav">
          {mediaWidth > 840 && (
            <div
              className="header__option"
              style={{ flexDirection: "row-reverse" }}
            >
              <span
                className="header__optionOne"
                style={{
                  fontWeight: "bold",
                  position: "relative",
                  top: "0.1em",
                }}
              >
                EN
              </span>
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

          {mediaWidth > 840 && (
            <Link to="/sell">
              <div className="header__option">
                <span
                  className="header__optionTwo"
                  style={{ fontSize: "1.2em", fontWeight: "500" }}
                >
                  Sell
                </span>
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

<Link to="/inventoryManagement">
            <div className="header__optionBasket">
              <div>
                <img
                  src={inventory}
                  alt="Inventory"
                  className="header__basket"
                />
              </div>
              {mediaWidth > 840 && (
                <span className="header__optionTwo">SIM</span>
              )}
            </div>
          </Link>

          {mediaWidth <= 840 && (
            <div
              className="header__mobileUser"
              onClick={() => !user && navigate("/login")}
            >
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
              {mediaWidth > 840 && (
                <span className="header__optionTwo">Cart</span>
              )}
            </div>
          </Link>
          {mediaWidth > 840 && user && (
            <div className="header__option1" id="coinIcon">
              <img src={coinIcon} alt="" style={{ width: "2.3rem" }} />
              {mediaWidth > 840 && (
                <span className="points" style={{ fontWeight: "bold" }}>
                  {parseInt(greenPoints)}
                </span>
              )}
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

export default React.memo(Header);
