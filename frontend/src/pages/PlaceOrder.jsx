import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/order.verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            navigate("/orders");
            setCartItems({});
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "razorpay":
          const responseRazorpay = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col lg:flex-row justify-between gap-10 px-4 sm:px-8 py-10 border-t min-h-[85vh] bg-gray-50"
    >
      {/* Left Side: Delivery Info */}
      <div className="flex-1 max-w-[600px] w-full mx-auto">
        <h3 className="text-2xl text-gray-700">Delivery Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <input
            required
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            placeholder="First name"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            type="text"
          />
          <input
            required
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            placeholder="Last name"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            type="text"
          />
          <input
            required
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            placeholder="Email address"
            className="border border-gray-300 rounded px-4 py-2 col-span-2"
            type="email"
          />
          <input
            required
            name="street"
            value={formData.street}
            onChange={onChangeHandler}
            placeholder="Street address"
            className="border border-gray-300 rounded px-4 py-2 col-span-2"
            type="text"
          />
          <input
            required
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            placeholder="City"
            className="border border-gray-300 rounded px-4 py-2"
            type="text"
          />
          <input
            required
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            placeholder="State"
            className="border border-gray-300 rounded px-4 py-2"
            type="text"
          />
          <input
            required
            name="zipcode"
            value={formData.zipcode}
            onChange={onChangeHandler}
            placeholder="Zip Code"
            className="border border-gray-300 rounded px-4 py-2"
            type="number"
          />
          <input
            required
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            placeholder="Country"
            className="border border-gray-300 rounded px-4 py-2"
            type="text"
          />
          <input
            required
            name="phone"
            value={formData.phone}
            onChange={onChangeHandler}
            placeholder="Phone"
            className="border border-gray-300 rounded px-4 py-2 col-span-2"
            type="text"
          />
        </div>
      </div>

      {/* Right Side: Cart + Payment */}
      <div className="flex-1 max-w-[400px] w-full mx-auto space-y-10">
        {/* Cart Total */}
        <div className="bg-white border shadow-md rounded-xl p-6 w-full">
          {/* Totals */}
          <CartTotal />
        </div>

        {/* Payment Method */}
        <div className="bg-white border shadow-md rounded-xl p-6 w-full">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Payment Method
          </h3>

          <div className="flex flex-col gap-3">
            {/* Razorpay Option */}
            <div
              onClick={() => setMethod("razorpay")}
              className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition hover:shadow-sm ${
                method === "razorpay" ? "border-black" : "border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 border rounded-full ${
                    method === "razorpay" ? "bg-gray-800" : ""
                  }`}
                ></div>
                <span className="text-sm font-medium text-gray-700">
                  Razorpay
                </span>
              </div>
              <img className="h-5" src={assets.razorpay_logo} alt="razorpay" />
            </div>

            {/* Cash on Delivery Option */}
            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition hover:shadow-sm ${
                method === "cod" ? "border-black" : "border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 border rounded-full ${
                    method === "cod" ? "bg-gray-800" : ""
                  }`}
                ></div>
                <span className="text-sm font-medium text-gray-700">
                  Cash on Delivery
                </span>
              </div>
            </div>
          </div>

          <div className="text-end mt-6">
            <button
              type="submit"
              className="bg-black text-white px-10 py-3 text-sm rounded hover:bg-gray-800 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
