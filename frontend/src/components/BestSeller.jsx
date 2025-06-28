import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Productitem from "./Productitem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="my-16 px-4 sm:px-8 lg:px-20">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-serif text-neutral-800 tracking-wide">
          BEST SELLERS
        </h2>
        <p className="max-w-xl mx-auto text-base text-neutral-500 mt-3 font-serif italic">
          Discover the most popular products loved by our customers. Grab yours
          before they're gone!
        </p>
      </div>

      {/* Product Horizontal Scroll Layout */}
      <div className="flex space-x-5 overflow-x-auto pb-4 scrollbar-hide">
        {bestSeller.length > 0 ? (
          bestSeller.map((item) => (
            <div
              key={item._id}
              className="min-w-[220px] max-w-[240px] flex-shrink-0"
            >
              <Productitem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 w-full">
            No best seller products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSeller;
