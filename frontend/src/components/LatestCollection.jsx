import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Productitem from "./Productitem";
import { useNavigate } from "react-router-dom";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLatestProducts(products.slice(0, 8));
  }, [products]);

  return (
    <div className="my-16 px-4 sm:px-8 lg:px-20">
      {/* Fancy Heading and Description */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-serif text-neutral-800 tracking-wide">
          Fresh Finds
        </h2>
        <p className="max-w-xl mx-auto text-base text-neutral-500 mt-3 font-serif italic">
          Curated picks just for you — find your next favorite outfit.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
        {latestProducts.length > 0 ? (
          latestProducts.map((item) => (
            <div key={item._id} className="p-2">
              <Productitem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400">
            No products found.
          </div>
        )}
      </div>

      {/* View More Button */}
      <div className="flex justify-center">
        <button
          onClick={() => navigate("/collection")}
          className="px-6 py-2 rounded-lg border border-black text-sm font-medium hover:bg-black hover:text-white transition"
        >
          Browse Entire Collection
        </button>
      </div>
    </div>
  );
};

export default LatestCollection;
