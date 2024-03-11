import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center mt-20 flex-col gap-5 ">
      <div className="text-xl">Ooops, 404, This page Not Found</div>
      <Link to={"/"} className="py-2 px-5 bg-slate-400 rounded text-white">
        Вернуться назад
      </Link>
    </div>
  );
};

export default NotFound;
