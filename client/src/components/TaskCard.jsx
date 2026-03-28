import React from "react";
import { motion } from "framer-motion";

export default function TaskCard({ task, onViewClick, onAssignClick }) {
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "text-sky-600";
      case "pending":
        return "text-yellow-600";
      case "completed":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 12px 24px rgba(124,131,253,0.15)" }}
      style={{ backgroundColor: "#D9DCE5" }}
      className="rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border-l-4 border-indigo-500"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 style={{ color: "#000000" }} className="text-lg font-bold flex-1">
          {task.title}
        </h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span style={{ color: "#4B5563" }} className="text-sm font-medium">
            Status
          </span>
          <span
            className={`text-sm font-semibold ${getStatusColor(task.status)}`}
          >
            {task.status}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span style={{ color: "#4B5563" }} className="text-sm font-medium">
            Priority
          </span>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border ${getPriorityColor(task.priority)}`}
          >
            {task.priority}
          </span>
        </div>
      </div>

      <div
        className="mt-4 pt-4 border-t flex gap-2"
        style={{ borderColor: "#D9DCE5" }}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAssignClick(task)}
          style={{ backgroundColor: "#7C83FD" }}
          className="flex-1 text-center px-3 py-2 text-white hover:opacity-90 font-bold text-sm rounded-lg transition"
        >
          Assign
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onViewClick(task)}
          style={{ backgroundColor: "#7C83FD" }}
          className="flex-1 text-center px-3 py-2 text-white hover:opacity-90 font-bold text-sm rounded-lg transition"
        >
          View
        </motion.button>
      </div>
    </motion.div>
  );
}
