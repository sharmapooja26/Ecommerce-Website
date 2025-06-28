import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const selectedProduct = products.find((item) => item._id === productId);
    if (selectedProduct) {
      setProductData(selectedProduct);
      setImage(selectedProduct.image[0]);
    }
  }, [productId, products]);

  if (!productData) {
    return <div className="opacity-0"></div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* Left Side Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.slice(0, 4).map((item, index) => (
              <img
                key={index}
                src={item}
                alt=""
                onClick={() => setImage(item)}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/* Right Side Product Details */}
        <div className="flex-1">
          {/* Heading */}
          <h1 className="font-medium text-2xl text-gray-800">
            {productData.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="" className="w-3.5" />
            ))}
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2 text-sm text-gray-600">(122)</p>
          </div>

          {/* Price */}
          <p className="mt-5 text-3xl font-semibold text-black">
            {currency}
            {productData.price}
          </p>

          {/* Description */}
          <p className="mt-5 text-gray-500 text-sm md:w-4/5 leading-relaxed">
            {productData.description}
          </p>

          {/* Size Selection */}
          <div className="flex flex-col gap-3 mt-8">
            <p className="text-sm font-medium text-gray-700">Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 text-sm rounded-md bg-gray-100 transition ${
                    item === size ? "border-black" : "border-gray-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className="mt-6 bg-black text-white px-8 py-3 text-sm rounded hover:bg-gray-900 transition"
          >
            Add to Cart
          </button>

          {/* Delivery Options */}
          <div className="mt-10 text-sm text-gray-700">
            <p className="font-semibold mb-3 text-base">DELIVERY OPTIONS</p>

            <div className="border rounded-md p-3 flex items-center justify-between max-w-xs">
              <input
                type="text"
                placeholder="Enter Pincode"
                className="outline-none w-full text-sm text-gray-800 font-medium"
              />
              <button className="text-black text-sm font-medium hover:underline">
                CHANGE
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <img src={assets.delivery_truck_icon} alt="" className="w-5" />
                <p>
                  Get it by{" "}
                  <span className="font-semibold text-black">Wed, Jul 02</span>
                </p>
              </div>
            </div>

            {/* Best Offers */}
          </div>

          {/* Final Note */}
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
