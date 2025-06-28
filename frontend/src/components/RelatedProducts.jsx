import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import Productitem from "./Productitem";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter(
        (item) => subCategory === item.subCategory
      );
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className="my-24 px-4 sm:px-8">
      <h2 className="text-2xl sm:text-3xl text-center font-semibold text-gray-800 mb-6 tracking-wide">
        RELATED PRODUCTS
      </h2>

      <div className="overflow-x-auto">
        <div className="flex gap-4 snap-x snap-mandatory overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {related.map((item, index) => (
            <div
              key={index}
              className="min-w-[280px] sm:min-w-[300px] snap-center bg-white rounded-2xl shadow-md p-3 hover:shadow-lg transition-all duration-300"
            >
              <Productitem
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
