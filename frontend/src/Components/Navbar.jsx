import React from 'react'
import { BsBagHeart, BsSearch, BsCart3 } from "react-icons/bs";
import { GoThreeBars } from "react-icons/go";
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="flex justify-between text-center items-center w-full h-14 text-xl bg-orange-400 ">
      <div className="flex bg-orange-700 w-60 justify-around ">
        <div className=""><GoThreeBars/></div>
        <div className="">HI,UserName</div>
      </div>

      <div className="nav-center">Logo</div>

      <div className="flex justify-around bg-lime-500 w-[400px]">
        <div className="navIcons">
          <BsSearch />
        </div>
        <div className="navIcons">
          <BsBagHeart />
        </div>
        <div className="navIcons">
          <BsCart3 />
        </div>
      </div>
    </div>
  );
}

export default Navbar