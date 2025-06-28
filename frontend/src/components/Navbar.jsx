import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 py-5 font-medium px-4 sm:px-8 relative font-serif">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} className="w-16 sm:w-16" alt="Logo" />
      </Link>

      {/* Navigation Links (Desktop) */}
      <ul className="hidden sm:flex gap-8 text-base text-gray-700">
        {["/", "/collection", "/about", "/contact"].map((path, index) => {
          const labels = ["Home", "Collection", "About", "Contact Us"];
          return (
            <li key={index}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `transition duration-300 hover:text-black hover:underline underline-offset-4 decoration-[1.5px] ${
                    isActive ? "text-black underline" : ""
                  }`
                }
              >
                {labels[index]}
              </NavLink>
            </li>
          );
        })}
      </ul>

      {/* Right Icons */}
      <div className="flex items-center gap-5 sm:gap-6 ml-auto sm:ml-0">
        {/* Search Icon */}
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
        />

        {/* Profile Icon + Dropdown */}
        <div className="group relative">
          <Link to={token ? "#" : "/login"}>
            <img
              onClick={() => (token ? null : navigate("/login"))}
              className="w-5 cursor-pointer"
              src={assets.profile_icon}
              alt="Profile"
            />
          </Link>

          {token && (
            <div className="group-hover:block hidden absolute right-0 pt-4 z-50">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-700 rounded-md shadow-lg">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
          <p className="absolute -right-1 -bottom-1 w-4 text-center leading-4 bg-red-500 text-white text-xs rounded-full">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      {/* Sidebar Menu (Mobile) */}
      <div
        className={`absolute top-0 right-0 h-full bg-white transition-all duration-300 ease-in-out z-50 ${
          visible ? "w-72 p-4" : "w-0"
        } overflow-hidden shadow-lg`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-3 p-3 cursor-pointer"
          >
            <img
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt="Back"
            />
            <p>Back</p>
          </div>
          {[
            { path: "/", label: "HOME" },
            { path: "/collection", label: "COLLECTION" },
            { path: "/about", label: "ABOUT" },
            { path: "/contact", label: "CONTACT" },
          ].map((item, index) => (
            <NavLink
              key={index}
              onClick={() => setVisible(false)}
              className="py-3 px-5 border-b text-sm hover:text-black"
              to={item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
