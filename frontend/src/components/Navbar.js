import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 
                 bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#1b4332] 
                 shadow-lg"
    >
      <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* Brand */}
        <Link
          to="/"
          className="text-white text-2xl font-semibold tracking-wide"
        >
          MedTrack
        </Link>

        {/* Navigation */}
        <div className="space-x-8 hidden md:flex items-center text-sm font-medium">

          {/* Home */}
          <Link
            to="/"
            className={`transition ${
              isActive("/") 
                ? "text-white border-b-2 border-white pb-1"
                : "text-[#d8f3dc] hover:text-white"
            }`}
          >
            Home
          </Link>

          {/* NOT LOGGED IN */}
          {!token && (
            <>
              <Link
                to="/login"
                className={`transition ${
                  isActive("/login")
                    ? "text-white border-b-2 border-white pb-1"
                    : "text-[#d8f3dc] hover:text-white"
                }`}
              >
                Login
              </Link>

              <Link
                to="/register"
                className={`transition ${
                  isActive("/register")
                    ? "text-white border-b-2 border-white pb-1"
                    : "text-[#d8f3dc] hover:text-white"
                }`}
              >
                Register
              </Link>
            </>
          )}

          {/* LOGGED IN */}
          {token && (
            <>
              <Link
                to="/dashboard"
                className={`transition ${
                  isActive("/dashboard")
                    ? "text-white border-b-2 border-white pb-1"
                    : "text-[#d8f3dc] hover:text-white"
                }`}
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="text-[#d8f3dc] hover:text-white transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;