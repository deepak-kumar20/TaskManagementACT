import React from "react";
import { motion } from "framer-motion";

export default function UserCard({ userItem, onViewClick }) {
  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-sky-100 text-sky-800";
      case "user":
        return "bg-blue-100 text-sky-800";
      case "manager":
        return "bg-sky-100 text-sky-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-sky-500"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-500 rounded-full flex items-center justify-center text-white font-bold">
          {userItem.name.charAt(0)}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {userItem.name}
          </h3>
          <p
            className={`text-xs font-semibold px-2 py-1 rounded mt-1 w-fit ${getRoleColor(userItem.role)}`}
          >
            {userItem.role}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-start">
          <span className="text-sm text-gray-600 font-medium">Email:</span>
          <a
            href={`mailto:${userItem.email}`}
            className="text-sm text-sky-500 hover:text-sky-600 ml-2 break-all"
          >
            {userItem.email}
          </a>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onViewClick && onViewClick(userItem)}
          className="w-full text-center text-indigo-600 hover:text-indigo-700 font-medium text-sm transition"
        >
          View Profile →
        </motion.button>
      </div>
    </motion.div>
  );
}
