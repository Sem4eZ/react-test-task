import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div
        className="mx-auto flex max-w-[1590px]
    max-h-[90px] items-center justify-center p-6 px-6 gap-x-6 bg-slate-400 text-white"
      >
        <Link to={"/"}>Товары</Link>
        <div>Корзина</div>
        <div>Что-то еще</div>
      </div>
    </header>
  );
};

export default Header;
