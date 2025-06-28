import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import Productitem from "../components/Productitem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [colors, setColors] = useState([]);
  const [priceRange, setPriceRange] = useState([100, 100]);
  const [sortType, setSortType] = useState("relevant");

  const colorOptions = [
    { name: "Red", code: "#FF0000" },
    { name: "Blue", code: "#0000FF" },
    { name: "Yellow", code: "#FFFF00" },
    { name: "Black", code: "#000000" },
    { name: "Orange", code: "#FFA500" },
    { name: "White", code: "#FFFFFF" },
    { name: "Dark Pink", code: "#FF1493" },
    { name: "Mustard", code: "#FFDB58" },
  ];

  const toggleCategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  };

  const toggleColor = (code) => {
    if (colors.includes(code)) {
      setColors((prev) => prev.filter((item) => item !== code));
    } else {
      setColors((prev) => [...prev, code]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    if (colors.length > 0) {
      productsCopy = productsCopy.filter((item) => colors.includes(item.color));
    }

    productsCopy = productsCopy.filter((item) => {
      return item.price >= priceRange[0] && item.price <= priceRange[1];
    });

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, colors, priceRange, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="grid xl:grid-cols-[250px_1fr] gap-10 pt-12 border-t px-6">
      {/* Sidebar Filter */}
      <div>
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="mb-4 text-xl flex items-center cursor-pointer gap-2 font-serif tracking-wide"
        >
          FILTERS
          <img
            className={`h-3 xl:hidden transition-transform duration-300 ${
              showFilter ? "rotate-90" : ""
            }`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        <div className={`${showFilter ? "block" : "hidden"} xl:block`}>
          <div className="mb-6">
            <p className="mb-3 text-sm font-medium text-gray-800">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {["Men", "Women", "Kids"].map((value) => (
                <label key={value} className="flex gap-2">
                  <input
                    className="w-3"
                    type="checkbox"
                    value={value}
                    onChange={toggleCategory}
                  />
                  {value}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="mb-3 text-sm font-medium text-gray-800">TYPE</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {["Topwear", "Bottomwear", "Winterwear"].map((value) => (
                <label key={value} className="flex gap-2">
                  <input
                    className="w-3"
                    type="checkbox"
                    value={value}
                    onChange={toggleSubCategory}
                  />
                  {value}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="mb-3 text-sm font-medium text-gray-800">COLOR</p>
            <div className="flex flex-wrap gap-3">
              {colorOptions.map((color) => (
                <div
                  key={color.name}
                  className={`w-8 h-8 rounded-full border cursor-pointer ${
                    colors.includes(color.code) ? "ring-2 ring-black" : ""
                  }`}
                  style={{ backgroundColor: color.code }}
                  onClick={() => toggleColor(color.code)}
                ></div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-gray-800">PRICE</p>
            <input
              type="range"
              min="100"
              max="1000"
              step="10"
              value={priceRange[1]}
              className="w-full h-1 rounded-lg appearance-none bg-gray-300"
              onChange={(e) =>
                setPriceRange([priceRange[0], parseInt(e.target.value)])
              }
            />
            <p className="mt-2 text-sm text-gray-700">
              ₹{priceRange[0]} - ₹{priceRange[1]}
            </p>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-6">
          <h2 className="text-3xl sm:text-4xl font-serif tracking-wide text-gray-800">
            Handpicked Styles For You
          </h2>
          <div className="relative inline-block text-left">
            <label className="text-sm text-gray-700 mr-2">Sort by:</label>
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="border border-gray-300 bg-white px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="relevant">Most Relevant</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filterProducts.map((item, index) => (
            <Productitem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
