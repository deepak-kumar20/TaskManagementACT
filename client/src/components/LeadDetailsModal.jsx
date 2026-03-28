import React, { useState } from "react";
import { motion } from "framer-motion";

export default function LeadDetailsModal({ isOpen, onClose, lead }) {
  const [actionMessage, setActionMessage] = useState("");

  if (!isOpen || !lead) return null;

  const handleSchedule = () => {
    setActionMessage("✓ Meeting scheduled with " + lead.name);
    setTimeout(() => setActionMessage(""), 2000);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-2xl w-full max-w-md"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-600 p-6 text-white flex justify-between items-start rounded-t-lg">
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{lead.name}</h2>
            <p className="text-sky-100 text-sm mt-1">{lead.company}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded p-1 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {actionMessage && (
            <motion.div
              className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {actionMessage}
            </motion.div>
          )}

          <div className="bg-sky-50 p-4 rounded-lg border border-sky-200">
            <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-1">
              Email
            </p>
            <a
              href={`mailto:${lead.email}`}
              className="text-sm text-sky-700 hover:text-sky-800 break-all font-medium"
            >
              {lead.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-1">
                Status
              </p>
              <p className="text-sm text-gray-900 font-medium">New Lead</p>
            </div>
            <div className="bg-cyan-50 p-3 rounded-lg border border-cyan-200">
              <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-1">
                Value
              </p>
              <p className="text-sm text-gray-900 font-medium">$50,000+</p>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-2">
              Notes
            </p>
            <p className="text-sm text-gray-700">
              High-potential lead interested in enterprise solutions.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-lg space-y-3">
          <motion.button
            onClick={handleSchedule}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Schedule Meeting
          </motion.button>
          <motion.button
            onClick={onClose}
            className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
