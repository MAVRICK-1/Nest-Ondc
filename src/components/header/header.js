import React, { useState, useEffect, useRef, useContext } from "react";
import "../header/header.css";
import Logo from "../../assets/images/logo.svg";
import SearchIcon from "@mui/icons-material/Search";
import Select from "../selectDrop/select";
import axios from "axios";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import IconCompare from "../../assets/images/icon-compare.svg";
import IconHeart from "../../assets/images/icon-heart.svg";
import IconCart from "../../assets/images/icon-cart.svg";
import Button from "@mui/material/Button";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import Nav from "./nav/nav";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { MyContext } from "../../App";

const Header = (props) => {
  const [isOpenDropDown, setisOpenDropDown] = useState(false);
  const [isOpenAccDropDown, setisOpenAccDropDown] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isopenSearch, setOpenSearch] = useState(false);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const { cartCount, wishlistCount } = useContext(MyContext);
  const headerRef = useRef();
  const searchInput = useRef();
  const [profile, setProfile] = useState("");
  const context = useContext(MyContext);
  const history = useNavigate();
  const [categories, setcategories] = useState([
    "Clothing & beauty",
    "Fresh Seafood",
    "Pet Foods & Toy",
    "Fast food",
    "Baking material",
    "Vegetables",
    "Fresh Fruit",
    "Bread and Juice",
    "Milks and Dairies",
    "Wines & Drinks",
    "Clothing & beauty",
    "Fresh Seafood",
  ]);
  const countryList = [];
  const [placeholderText, setPlaceholderText] = useState("Search for items...");
  
  useEffect(() => {
    const suggestions = [
      "Search for groceries...",
      "Search for electronics...",
      "Search for clothing...",
      "Search for food...",
      "Search for accessories...",
    ];

    const updatePlaceholder = () => {
      const randomIndex = Math.floor(Math.random() * suggestions.length);
      setPlaceholderText(suggestions[randomIndex]);
    };

    const interval = setInterval(updatePlaceholder, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getCountry("https://countriesnow.space/api/v0.1/countries/");
  }, []);

  useEffect(() => {
    setProfile(localStorage.getItem("userImage"));
  }, [context.isLogin]);

  const getCountry = async (url) => {
    try {
      const res = await axios.get(url);
      if (res !== null) {
        res.data.data.forEach((item) => {
          countryList.push(item.country);
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOut = () => {
    context.signOut();
    localStorage.setItem("userImage", "");
    history("/");
  };

  const openSearch = () => {
    setOpenSearch(true);
    searchInput.current.focus();
  };

  const closeSearch = () => {
    setOpenSearch(false);
    searchInput.current.blur();
    searchInput.current.value = "";
  };

  const openNav = () => {
    setIsOpenNav(true);
    context.setIsopenNavigation(true);
  };

  const closeNav = () => {
    setIsOpenNav(false);
    setisOpenAccDropDown(false);
    context.setIsopenNavigation(false);
  };

  return (
    <>
      <div className="headerWrapper" ref={headerRef}>
        <header>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-2 part1 d-flex align-items-center">
                <Link to="/">
                  <img src={Logo} className="logo" alt="Logo" />
                </Link>
                {windowWidth < 992 && (
                  <div className="ml-auto d-flex align-items-center">
                    <div className="navbarToggle mr-0" onClick={openSearch}>
                      <SearchIcon />
                    </div>
                    <ul className="list list-inline mb-0 headerTabs pl-0 mr-4">
                      <li className="list-inline-item">
                        <span>
                          <Link to={"/cart"}>
                            <img src={IconCart} alt="Cart Icon" />
                            <span className="badge bg-success rounded-circle">
                              {cartCount}
                            </span>
                          </Link>
                        </span>
                      </li>
                    </ul>
                    <div className="navbarToggle mr-2" onClick={openNav}>
                      <MenuIcon />
                    </div>
                    {context.isLogin === "true" && (
                      <div
                        onClick={() => setisOpenAccDropDown(!isOpenAccDropDown)}
                      >
                        {profile ? (
                          <img
                            src={profile}
                            alt="Profile"
                            style={{
                              width: "65%",
                              height: "65%",
                              borderRadius: "50%",
                              marginLeft: "15%",
                            }}
                          />
                        ) : (
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/5323/5323352.png"
                            alt="Default Profile"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              marginLeft: "13%",
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/*headerSearch start here */}
              <div className="col-sm-5 part2">
                <div
                  className={`headerSearch d-flex align-items-center ${
                    isopenSearch === true ? "open" : ""
                  }`}
                >
                  {windowWidth < 992 && (
                    <div className="closeSearch" onClick={closeSearch}>
                      <ArrowBackIosIcon />
                    </div>
                  )}
                  <Select
                    data={categories}
                    placeholder={"All Categories"}
                    icon={false}
                  />
                  <div className="search">
                    <input
                      type="text"
                      placeholder={placeholderText}
                      ref={searchInput}
                    />
                    <SearchIcon className="searchIcon cursor" />
                  </div>
                </div>
              </div>
              {/*headerSearch end here */}

              <div className="col-sm-5 d-flex align-items-center part3 res-hide">
                <div className="ml-auto d-flex align-items-center">
                  <div className="countryWrapper">
                    <Select
                      data={countryList}
                      placeholder={"Your Location"}
                      icon={
                        <LocationOnOutlinedIcon style={{ opacity: "0.5" }} />
                      }
                    />
                  </div>
                  <ClickAwayListener
                    onClickAway={() => setisOpenDropDown(false)}
                  >
                    <ul className="list list-inline mb-0 headerTabs">
                      <li className="list-inline-item">
                        <span>
                          <Link
                            to={"/compare"}
                            style={{ textDecoration: "none" }}
                          >
                            <img src={IconCompare} alt="Compare Icon" />
                            <span className="badge bg-success rounded-circle">
                              {wishlistCount}
                            </span>
                            Compare
                          </Link>
                        </span>
                      </li>
                      <li className="list-inline-item">
                        <span>
                          <Link
                            to={"/wishlist"}
                            style={{ textDecoration: "none" }}
                          >
                            <img src={IconHeart} alt="Wishlist Icon" />
                            <span className="badge bg-success rounded-circle">
                              {wishlistCount}
                            </span>
                            Wishlist
                          </Link>
                        </span>
                      </li>
                      <li className="list-inline-item">
                        <span>
                          <Link to={"/cart"} style={{ textDecoration: "none" }}>
                            <img src={IconCart} alt="Cart Icon" />
                            <span className="badge bg-success rounded-circle">
                              {cartCount}
                            </span>
                            Cart
                          </Link>
                        </span>
                      </li>
                      {context.isLogin === "true" ? (
                        <li className="list-inline-item">
                          <span
                            onClick={() => setisOpenDropDown(!isOpenDropDown)}
                          >
                            {profile ? (
                              <img
                                src={profile}
                                alt="Profile"
                                style={{
                                  width: "65%",
                                  height: "65%",
                                  borderRadius: "50%",
                                  marginLeft: "18%",
                                }}
                              />
                            ) : (
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/5323/5323352.png"
                                alt="Default Profile"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                  marginLeft: "18%",
                                }}
                              />
                            )}
                          </span>

                          {isOpenDropDown && (
                            <ul className="dropdownMenu">
                              <li>
                                <Button className="align-items-center">
                                  <Person2OutlinedIcon /> My Account
                                </Button>
                              </li>
                              <li>
                                <Button>
                                  <LocationOnOutlinedIcon /> Order Tracking
                                </Button>
                              </li>
                              <li>
                                <Button>
                                  <FavoriteBorderOutlinedIcon />
                                  <Link
                                    to={"/wishlist"}
                                    style={{
                                      textDecoration: "none",
                                      color: "rgba(0, 0, 0, 0.7)",
                                    }}
                                  >
                                    My Wishlist
                                  </Link>
                                </Button>
                              </li>
                              <li>
                                <Button>
                                  <Link to={"/seller"}> Sell items</Link>
                                </Button>
                              </li>
                              <li>
                                <Button>
                                  <SettingsOutlinedIcon /> Setting
                                </Button>
                              </li>
                              <li>
                                <Button onClick={signOut}>
                                  <LogoutOutlinedIcon /> Sign out
                                </Button>
                              </li>
                            </ul>
                          )}
                        </li>
                      ) : (
                        <li className="list-inline-item">
                          <Link to={"/signIn"}>
                            <Button className="btn btn-g">Sign In</Button>
                          </Link>
                        </li>
                      )}
                    </ul>
                  </ClickAwayListener>
                </div>
              </div>
            </div>
          </div>
        </header>

        <Nav data={props.data} openNav={isOpenNav} closeNav={closeNav} />
      </div>

      <div className="afterHeader"></div>

      {isOpenAccDropDown && (
        <>
          <div className="navbarOverlay" onClick={closeNav}></div>
          <ul className="dropdownMenu dropdownMenuAcc" onClick={closeNav}>
            <li>
              <Button className="align-items-center">
                <Link to="">
                  <Person2OutlinedIcon /> My Account
                </Link>
              </Button>
            </li>
            <li>
              <Button className="align-items-center">
                <Link to="">
                  <img src={IconCompare} alt="Compare Icon" />
                  Compare
                </Link>
              </Button>
            </li>
            <li>
              <Button className="align-items-center">
                <Link to="">
                  <img src={IconCart} alt="Cart Icon" />
                  Cart
                </Link>
              </Button>
            </li>
            <li>
              <Button>
                <Link to="">
                  <LocationOnOutlinedIcon /> Order Tracking
                </Link>
              </Button>
            </li>
            <li>
              <Button>
                <Link to={"/wishlist"} style={{ textDecoration: "none" }}>
                  <FavoriteBorderOutlinedIcon /> My Wishlist
                </Link>
              </Button>
            </li>
            <li>
              <Button>
                <Link to={"/seller"}> Sell items</Link>
              </Button>
            </li>
            <li>
              <Button>
                <Link to="">
                  <SettingsOutlinedIcon /> Setting
                </Link>
              </Button>
            </li>
            <li>
              <Button onClick={signOut}>
                <Link to="">
                  <LogoutOutlinedIcon /> Sign out
                </Link>
              </Button>
            </li>
          </ul>
        </>
      )}
    </>
  );
};

export default Header;


