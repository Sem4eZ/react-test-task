import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <header>
      <div
        className="mx-auto flex 
    max-h-[90px] items-center justify-center p-6 px-6 gap-x-6 bg-indigo-100 shadow-xl text-black text-xl"
      >
        <Link to={"/"}>Товары</Link>
        <Link to={"/cart"}>
          Корзина{" "}
          <span className="absolute px-2 bg-red-300 rounded-full text-xs">
            {cartItems.length}
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
