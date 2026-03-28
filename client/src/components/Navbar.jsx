import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const logoColor = location.pathname === "/about" ? "#D9DCE5" : "#7C83FD";

  return (
    <nav className="bg-black shadow-lg border-b border-blue-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1
              style={{ color: logoColor }}
              className="text-2xl font-black cursor-pointer hover:opacity-80 transition"
              onClick={() => navigate("/dashboard")}
            >
              FULLSTACK ACT
            </h1>
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => navigate("/about")}
                className="text-white hover:text-blue-400 transition font-bold text-sm uppercase tracking-wide"
              >
                About
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Welcome back
              </p>
              <p className="text-lg font-bold text-white">
                {user?.name || "User"}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition duration-200 transform hover:scale-105 uppercase text-sm tracking-wide"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
