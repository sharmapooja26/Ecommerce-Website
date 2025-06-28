import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location, showSearch]);

  return showSearch && visible ? (
    <div className="flex justify-center items-center py-4">
      <div className="relative w-96">
        <input
          type="text"
          value={search}
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-4 pr-10 py-2 border rounded-full outline-none bg-white text-sm text-gray-700"
        />
        <img
          src={assets.search_icon}
          alt="Search"
          className="absolute right-10 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
        />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        src={assets.cross_icon}
        alt="Close"
        className="ml-4 w-5 h-5 cursor-pointer"
      />
    </div>
  ) : null;
};

export default SearchBar;
