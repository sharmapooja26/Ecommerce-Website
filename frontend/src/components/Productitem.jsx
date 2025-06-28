import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const Productitem = ({ id, image, name, price }) => {
  const imageUrl = typeof image === "string" ? image : image?.[0] || "";
  const { currency } = useContext(ShopContext);

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="w-full h-[300px] overflow-hidden rounded-md mb-2">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={image}
          alt="image"
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default Productitem;
