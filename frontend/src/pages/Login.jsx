import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
      >
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            {currentState}
          </h2>
          <div className="w-12 h-1 bg-gray-800 mx-auto mt-2 rounded-full" />
        </div>

        {currentState === "Sign Up" && (
          <div className="mb-4">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Name"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Email"
            required
          />
        </div>

        <div className="mb-2">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Password"
            required
          />
        </div>

        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <p className="cursor-pointer hover:underline">Forgot Password?</p>
          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer hover:underline"
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer hover:underline"
            >
              Login Here
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition"
        >
          {currentState === "Login" ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
