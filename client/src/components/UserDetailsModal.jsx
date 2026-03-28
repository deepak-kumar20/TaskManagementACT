import React from "react";
import { motion } from "framer-motion";

export default function UserDetailsModal({ isOpen, onClose, user }) {
  if (!isOpen || !user) return null;

  // Mock data for user profile
  const mockUserProfile = {
    name: user.name || "John Doe",
    email: user.email || "john.doe@example.com",
    role: user.role || "Manager",
    department: "Sales & Marketing",
    joinDate: "January 15, 2024",
    status: "Active",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    tasksCompleted: 24,
    projectsAssigned: 5,
    bio: "Experienced professional with strong leadership skills and a track record of delivering results.",
  };

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "manager":
        return "bg-blue-100 text-blue-800";
      case "user":
        return "bg-sky-100 text-sky-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    return status === "Active"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-600 p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold">
              {mockUserProfile.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{mockUserProfile.name}</h2>
              <p className="text-sky-100 text-sm">{mockUserProfile.role}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 w-9 h-9 flex items-center justify-center"
            >
              ✕
            </motion.button>
          </div>
        </div>

        {/* Content - Compact */}
        <div className="p-6 space-y-4">
          {/* Status Badge */}
          <div className="flex gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(mockUserProfile.status)}`}
            >
              {mockUserProfile.status}
            </span>
          </div>

          {/* Info Grid - 2 columns */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600 font-medium text-xs mb-1">Email</p>
              <a
                href={`mailto:${mockUserProfile.email}`}
                className="text-sky-600 hover:text-sky-700 break-all text-xs font-medium"
              >
                {mockUserProfile.email}
              </a>
            </div>
            <div>
              <p className="text-gray-600 font-medium text-xs mb-1">Phone</p>
              <a
                href={`tel:${mockUserProfile.phone}`}
                className="text-sky-600 hover:text-sky-700 text-xs font-medium"
              >
                {mockUserProfile.phone}
              </a>
            </div>
            <div>
              <p className="text-gray-600 font-medium text-xs mb-1">
                Department
              </p>
              <p className="text-gray-900 font-medium text-xs">
                {mockUserProfile.department}
              </p>
            </div>
            <div>
              <p className="text-gray-600 font-medium text-xs mb-1">Location</p>
              <p className="text-gray-900 font-medium text-xs">
                {mockUserProfile.location}
              </p>
            </div>
          </div>

          {/* Stats - Compact */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-200">
            <div className="text-center">
              <p className="text-lg font-bold text-sky-600">
                {mockUserProfile.tasksCompleted}
              </p>
              <p className="text-xs text-gray-600">Tasks</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-blue-600">
                {mockUserProfile.projectsAssigned}
              </p>
              <p className="text-xs text-gray-600">Projects</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-sky-500">Active</p>
              <p className="text-xs text-gray-600">Status</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-3 py-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition"
            >
              Message
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-50 transition"
            >
              Close
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
