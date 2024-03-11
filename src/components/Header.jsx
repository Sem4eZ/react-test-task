import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div
        className="mx-auto flex 
    max-h-[90px] items-center justify-center p-6 px-6 gap-x-6 bg-indigo-200 shadow-xl text-black text-xl"
      >
        <Link to={"/"}>Товары</Link>
        <Link to={"/cart"}>Корзина</Link>
      </div>
    </header>
  );
};

export default Header;
