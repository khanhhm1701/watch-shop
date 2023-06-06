import React from "react";
import { logo } from "../assets/img/index";
import "../assets/scss/Header.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const productData = useSelector((state) => state.watchHouse.productData);
  const userInfo = useSelector((state) => state.watchHouse.userInfo);
  console.log(userInfo);
  console.log(productData);
  return (
    <div className="header w-full h-20 bg-white font-titleFont">
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="" className="logo-img" />
        </div>
      </Link>
      <ul className="nav-bar">
        <li className="nav-bar-item">Home</li>
        <li className="nav-bar-item">Pages</li>
        <li className="nav-bar-item">Shop</li>
        <li className="nav-bar-item">Element</li>
        <li className="nav-bar-item">Blog</li>
        <li className="nav-bar-item relative">
          <Link to="/cart">
            <i className="fa-solid fa-cart-shopping"></i>
            <span
              className="absolute w-4 h-4 text-[12px] bottom-5 right-3 flex items-center justify-center
           bg-white rounded-full text-red-500 border border-1 border-solid border-red-500"
            >
              {productData.length}
            </span>
          </Link>
        </li>
        <li className="nav-bar-item">
          <Link to="/login">
            <div className="user-img">
              <img
                src={
                  userInfo
                    ? userInfo.image
                    : "https://t4.ftcdn.net/jpg/03/32/59/65/360_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
                }
                alt="UserImg"
                className=" w-8"
              />
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
