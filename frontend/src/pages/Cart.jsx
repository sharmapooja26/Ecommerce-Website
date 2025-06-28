import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const size in cartItems[items]) {
          const quantity = cartItems[items][size];
          if (quantity > 0) {
            tempData.push({
              _id: items,
              size,
              quantity,
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  // Totals
  const subtotal = cartData.reduce((total, item) => {
    const product = products.find((p) => p._id === item._id);
    return total + product.price * item.quantity;
  }, 0);
  const shipping = subtotal > 1000 ? 0 : 49;
  const total = subtotal + shipping;

  return (
    <div className="border-t pt-14 px-4 sm:px-8">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">Your Cart</h2>
        <div className="h-[2px] w-16 bg-black" />
      </div>

      <div className="flex flex-col-reverse sm:flex-row-reverse gap-10">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          {cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );
            if (!productData) return null;

            return (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-sm grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] items-center gap-6 bg-white"
              >
                <div className="flex items-center gap-4">
                  <img
                    className="w-20 h-20 object-cover rounded-md"
                    src={productData.image[0]}
                    alt=""
                  />
                  <p className="text-sm sm:text-base font-medium">
                    {productData.name}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <p className="text-sm font-semibold">
                    {currency}
                    {productData.price}
                  </p>
                  <p className="px-3 py-1 text-xs border bg-slate-100 rounded-full">
                    Size: {item.size}
                  </p>
                </div>

                <div className="flex items-center gap-3 sm:justify-end">
                  <input
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value !== "" && Number(value) >= 1) {
                        updateQuantity(item._id, item.size, Number(value));
                      }
                    }}
                    className="border w-12 sm:w-16 text-center px-2 py-1 rounded-md"
                    type="number"
                    min={1}
                    value={item.quantity}
                  />
                  <img
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="w-5 cursor-pointer"
                    src={assets.bin_icon}
                    alt="Delete"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Cart Total (now on left) */}
        <div className="w-full sm:w-[400px] bg-white border shadow-lg rounded-xl p-6 space-y-4 h-fit">
          <h3 className="text-xl font-semibold text-gray-800">
            Order Overview
          </h3>
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>
              {currency}
              {subtotal}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `${currency}${shipping}`}</span>
          </div>
          <hr />
          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>
              {currency}
              {total}
            </span>
          </div>

          <div className="w-full text-end mt-4">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm px-8 py-3 rounded hover:bg-gray-900 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
